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
    // Configurar la respuesta simulada para axios.get
    axiosMockInstance.onGet("/files").reply(200, {
      files: ["file1.txt", "file2.txt", "file3.txt"],
    });

    // Realizar la solicitud HTTP
    const response = await chai.request(app).get("/files/list");

    // Afirmar que la solicitud fue exitosa (código de estado 200)
    expect(response).to.have.status(200);

    // Afirmar que la respuesta es en formato JSON
    expect(response).to.be.json;

    // Afirmar que la respuesta contiene la lista de archivos esperada
    expect(response.body.files).to.deep.equal([
      "file1.txt",
      "file2.txt",
      "file3.txt",
    ]);
  });
   it("should fetch data for a file successfully", async () => {
    // Configurar el mock para simular una respuesta exitosa
    const mockFileName = "test3.csv";
    const mockResponse = "FileName,test3.csv,Text,1,0x123\nAnotherText,2,0x456";
    axiosMockInstance.onGet(`file/${mockFileName}`).reply(200, mockResponse);

    // Llamar a la función fetchDataForFile
    const result = await filesController.fetchDataForFile(mockFileName);

    // Verificar que la respuesta sea la esperada
    expect(result.file).to.equal(mockFileName);
    expect(result.lines).to.deep.equal([
      { text: "Text", number: 1, hex: "0x123" },
      { text: "AnotherText", number: 2, hex: "0x456" },
    ]);
  });

  it("should handle errors and return an error message", async () => {
    // Configurar el mock para simular un error
    const mockFileName = "example.csv";
    axiosMockInstance.onGet(`file/${mockFileName}`).reply(500, "Internal Server Error");

    // Llamar a la función fetchDataForFile
    const result = await filesController.fetchDataForFile(mockFileName);

    // Verificar que la respuesta indique un error
    expect(result.error).to.equal("El archivo tiene un error");
  });
});
