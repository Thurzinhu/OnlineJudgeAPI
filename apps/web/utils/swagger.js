const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "OnlineJudge API",
      version: "1.0.0",
      description: "OnlineJudge API documentation.",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The user ID.",
            },
            firstName: {
              type: "string",
              description: "The user's first name.",
            },
            lastName: {
              type: "string",
              description: "The user's last name.",
            },
            email: {
              type: "string",
              description: "The user's email address.",
            },
            password: {
              type: "string",
              description: "The user's password.",
            },
            role: {
              type: "string",
              enum: ["user", "admin"],
              description: "The user's role.",
            },
            refreshToken: {
              type: "string",
              description: "The user's refresh token.",
            },
          },
          required: ["firstName", "lastName", "email", "password"],
        },
        Problem: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The problem ID.",
            },
            title: {
              type: "string",
              description: "The problem title.",
            },
            description: {
              type: "string",
              description: "The problem description.",
            },
            slug: {
              type: "string",
              description: "The problem slug.",
            },
            author: {
              type: "string",
              description: "The ID of the user who created the problem.",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "The date and time when the problem was created.",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "The date and time when the problem was last updated.",
            },
          },
          required: ["title", "description", "slug"],
        },
        Submission: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The submission ID.",
            },
            user: {
              type: "string",
              description: "The ID of the user who made the submission.",
            },
            problem: {
              type: "string",
              description: "The ID of the problem to which the submission was made.",
            },
            code: {
              type: "string",
              description: "The code submitted by the user.",
            },
            language: {
              type: "string",
              description: "The programming language of the submitted code.",
            },
            status: {
              type: "string",
              enum: ["Pending", "Accepted", "Rejected"],
              description: "The status of the submission.",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "The date and time when the submission was created.",
            },
            testCases: {
              type: "array",
              items: {
                type: "string",
                description: "The ID of the test case.",
              },
              description: "List of test case IDs associated with the submission.",
            },
          },
          required: ["user", "problem", "code"],
        },
        TestCase: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The test case ID.",
            },
            submission: {
              type: "string",
              description: "The ID of the submission associated with the test case.",
            },
            status: {
              type: "string",
              enum: ["AC", "WA", "RE", "CE", "TLE", "Pending"],
              description: "The status of the test case.",
            },
            time: {
              type: "number",
              description: "The time taken by the test case.",
            },
            memory: {
              type: "number",
              description: "The memory used by the test case.",
            },
            judge0TrackingId: {
              type: "string",
              description: "The Judge0 tracking ID for the test case.",
            },
          },
          required: ["submission", "judge0TrackingId"],
        },
        DefaultCode: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The default code ID.",
            },
            boilerplate: {
              type: "string",
              description: "The boilerplate code.",
            },
            language: {
              type: "string",
              description: "The programming language of the boilerplate code.",
            },
            problem: {
              type: "string",
              description: "The ID of the problem associated with the default code.",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "The date and time when the default code was created.",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "The date and time when the default code was last updated.",
            },
          },
          required: ["boilerplate", "problem"],
        },
      },
    },
  },
  apis: [path.join(__dirname, "../routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/docs.json", (req, res) => {
    res.json(swaggerSpec);
  });
};

module.exports = setupSwagger;
