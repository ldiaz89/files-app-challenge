const chai = require("chai");
const chaiHttp = require("chai-http");
const spies = require("chai-spies");
const app = require("../server"); // Ajusta la ruta según la estructura de tu proyecto
const AxiosMock = require("axios-mock-adapter");
const axiosInstance = require("../axiosConfig");
const filesController = require("../controllers/getFilesData");

chai.use(chaiHttp);
chai.use(spies);
const expect = chai.expect;

describe("API Tests", () => {
  const axiosMockInstance = new AxiosMock(axiosInstance);

  beforeEach(() => {
    axiosMockInstance.reset();
  });

  it("should return status 200 for GET /files/data", async () => {
    it("should return status 200 and a JSON response", async () => {
      const response = await chai.request(app).get("/files/data");

      expect(response).to.have.status(200);
      expect(response).to.be.json;
    });
  });
  it("should return a list of files for GET /files/list", async () => {
    axiosMockInstance.onGet("/files").reply(200, {
      files: ["file1.txt", "file2.txt", "file3.txt"],
    });

    const response = await chai.request(app).get("/files/list");

    expect(response).to.have.status(200);

    expect(response).to.be.json;

    expect(response.body.files).to.deep.equal([
      "file1.txt",
      "file2.txt",
      "file3.txt",
    ]);
  });
   it("should fetch data for a file successfully", async () => {
    const mockFileName = "test3.csv";
    const mockResponse = "FileName,test3.csv,Text,1,0x123\nAnotherText,2,0x456";
    axiosMockInstance.onGet(`file/${mockFileName}`).reply(200, mockResponse);

    const result = await filesController.fetchDataForFile(mockFileName);

    expect(result.file).to.equal(mockFileName);
    expect(result.lines).to.deep.equal([
      { text: "Text", number: 1, hex: "0x123" },
      { text: "AnotherText", number: 2, hex: "0x456" },
    ]);
  });

  it("should handle errors and return an error message", async () => {
    const mockFileName = "example.csv";
    axiosMockInstance.onGet(`file/${mockFileName}`).reply(500, "Internal Server Error");

    const result = await filesController.fetchDataForFile(mockFileName);

    expect(result.error).to.equal("El archivo tiene un error");
  });
});
