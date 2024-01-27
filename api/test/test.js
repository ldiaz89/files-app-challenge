const chai = require('chai')
const chaiHttp = require('chai-http')
const spies = require('chai-spies');
const app = require('../server') // Ajusta la ruta según la estructura de tu proyecto
const AxiosMock = require('axios-mock-adapter')
const axiosInstance = require('../axiosConfig')
const filesController = require('../controllers/getFilesData')

chai.use(chaiHttp)
chai.use(spies);
const expect = chai.expect

describe('API Tests', () => {
  const axiosMockInstance = new AxiosMock(axiosInstance)

  beforeEach(() => {
    // Limpiar cualquier configuración de axios antes de cada prueba
    axiosMockInstance.reset()
  })

  it('should return status 200 for GET /files/data', async () => {
    it('should return status 200 and a JSON response', async () => {
    const response = await chai.request(app).get('/files/data');

    expect(response).to.have.status(200);
    expect(response).to.be.json;
  });
  })

 
  it('should return a JSON response with data from fetchDataForFile', async () => {
    // Configurar axios para utilizar el MockAdapter
    const mock = new AxiosMock(axiosInstance);

    // Configurar la respuesta simulada para axios.get
    mock.onGet('/files').reply(200, {
      files: {
        file1: 'file1.csv',
        file2: 'file2.csv',
      },
    });

    // Simular la respuesta de fetchDataForFile
    chai.spy.on(filesController.fetchDataForFile(), 'fetchDataForFile', () =>
      Promise.resolve({ text: 'example', number: 42, hex: '0x123' })
    );

    // Crear un objeto de solicitud y respuesta falsos
    const req = {};
    const res = {
      json: chai.spy(),
      status: () => res, // Para encadenar métodos
    };

    // Llamar al controlador
    await filesController.getFilesData(req, res);

    // Afirmaciones
    console.log("a ver",res.status())
    // expect(res.status).to.have.been.called.with(200);
    expect(res.json).to.deep.include({ mensaje: [{ text: 'example', number: 42, hex: '0x123' }] });

    // Restaurar la implementación original de fetchDataForFile
    chai.spy.restore(filesController.fetchDataForFile);

    // Restaurar el MockAdapter
    mock.restore();
  });

  // Agrega más pruebas según tus requisitos
});

