
import http from 'k6/http';
import encoding from 'k6/encoding';
import { check } from 'k6';



// init - aqui é definido variaveis globais que serão utilizadas ao decorrer do teste e  parámetros do teste de carga
// como tempo de duração, quantidade de Usuários Virtuais (VU), quantida de requisições, etc. 
var ambiente = "http://localhost:5000"

export const options = {
    scenarios: {
      shared_iterations_scenario: {
        executor: "shared-iterations",
        vus: 10,
        iterations: 100,
        startTime: "0s",
      },
      
      per_vu_scenario: {
        executor: "per-vu-iterations",
        vus: 10,
        iterations: 10,
        startTime: "10s",
      },

      constant_arrival_rate_scenario: {
        executor: 'constant-arrival-rate',
  
        // definida a duração do teste, pode ser utilizada a unidade de médida para definir o tempo de duração (s: segundos; m: minutos; h: horas))
        duration: '1m',
  
        //definido a quantidade de requisições que serão executadas a cada tempo definido no campo timeUnit
        rate: 30,
  
        //definido unidade de tempo definida para ser utilizada no teste (s: segundos; m: minutos; h: horas)
        timeUnit: '1s',
  
        // definido a quantidade de usuários virtuais serão alocados inicialmente
        preAllocatedVUs: 2,
  
        // definido a quantidade máxima de usuários que pode ser alocada durante o teste
        maxVUs: 50,
      },
    },
  };

  const username = "admin"
  const password = "admin"
  const credentials = `${username}:${password}`
  const encodedCredentials = encoding.b64encode(credentials)

  const header = {
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
  }


export function setup() {
    // 2. setup - aqui é definido o código que será executado antes da inicialização do teste, essa etapa é executada somente 1 vez
    console.log("camada de setup do teste de carga......")
   
  }
  
  export default function (data) {
    // 3. VU - aqui é definido o fluxo do teste de carga, o código é executado repetidamente, dependendo da configuração definido na camada de init

    //realizando requisição http e armazenando o response em uma constante
    const response = http.get(`${ambiente}/feature--toggle/api/ff4j/store/features`, header)

    //realizando o check do status code do response
    check(response, {
        'status code é 200': (res) => res.status === 200
    })
    
  }
  
  export function teardown(data) {
    // 4. teardown - aqui é definido o código que será executado após a realização do teste de carga
    console.log("encerrando o teste de carga.....")
  }
  