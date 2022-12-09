const pool = require("../../db");
const queries = require("./queries");
const amqp = require("amqplib/callback_api");

// Rabbit info
const queue = "users";
const rabbit_host = "34.148.229.15";
const rabbit_user = "monitoring_user";
const rabbit_password = "isis2503";
const rabbit_port = "5672";

async function sendToRabbitMQ(message) {
  amqp.connect(
    "amqp://" +
      rabbit_user +
      ":" +
      rabbit_password +
      "@" +
      rabbit_host +
      ":" +
      rabbit_port,
    function (error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }

        channel.assertQueue(queue, {
          durable: true,
        });

        channel.sendToQueue(queue, Buffer.from(message));
      });
      setTimeout(function () {
        connection.close();
      }, 500);
    }
  );
}

const getEmployeeLoanApplicants = async (req, res) => {
  try {
    const response = await pool.query(queries.getEmployeeLoanApplicants);
    res.status(200).json(response.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const getEmployeeLoanApplicantById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const response = await pool.query(queries.getEmployeeLoanApplicantById, [
      id,
    ]);
    res.status(200).json(response.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const createEmployeeLoanApplicant = async (req, res) => {
  const {
    first_name,
    last_name,
    document_type,
    document_number,
    email,
    phone,
    enterprise_id,
  } = req.body;

  try {
    // Check if the document number already exists
    const response = await pool.query(
      queries.checkEmployeeLoanApplicantByDocumentNumber,
      [document_number]
    );

    if (response.rows.length > 0) {
      return res.status(400).json("The document number already exists");
    }

    const response2 = await pool.query(queries.createEmployeeLoanApplicant, [
      first_name,
      last_name,
      document_type,
      document_number,
      email,
      phone,
      enterprise_id,
    ]);

    // Send to RabbitMQ

    const message = {
      type: "create",
      data: {
        first_name: first_name,
        last_name: last_name,
        document_type: document_type,
        document_number: document_number,
        email: email,
        phone: phone,
        enterprise_id: enterprise_id,
      },
    };

    sendToRabbitMQ(JSON.stringify(message));

    res.status(201).json(response2.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const updateEmployeeLoanApplicant = async (req, res) => {
  const id = parseInt(req.params.id);
  const {
    first_name,
    last_name,
    document_type,
    document_number,
    email,
    phone,
    enterprise_id,
  } = req.body;

  try {
    const response = await pool.query(queries.updateEmployeeLoanApplicant, [
      first_name,
      last_name,
      document_type,
      document_number,
      email,
      phone,
      enterprise_id,
      id,
    ]);
    res.status(200).json(response.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const deleteEmployeeLoanApplicant = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const response = await pool.query(queries.deleteEmployeeLoanApplicant, [
      id,
    ]);

    // Send to RabbitMQ

    const message = {
      type: "delete",
      data: {
        id: id,
      },
    };

    sendToRabbitMQ(JSON.stringify(message));

    res.status(200).json(response.rows);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  getEmployeeLoanApplicants,
  getEmployeeLoanApplicantById,
  createEmployeeLoanApplicant,
  updateEmployeeLoanApplicant,
};
