# estudo--k6-com-grafana-e-prometheus
estudo  da ferramenta para teste de carga K6, exportando  métricas para o prometheus e gerando dashboard no grafana.

## Tecnologias
- K6
- Docker
- Grafana
- Prometheus
- Javascript


## Inicialização Grafana + Prometheus
Para iniciar o Grafana com o prometheus, precisamos primeiro criar a network que será utilizada no docker-compose.
Para isso, deve executar o comando abaixo:

```console
docker network create monitoring
```

Após criar a network, deve executar o comando abaixo para subir os containers do Grafana e do Prometheus:

```console
docker-compose up
```

## Ajustar Dashboard Grafana
Com o Grafana e o Prometheus iniciado, devemos ajustar o Grafana para interpretar as métricas do Prometheus e criar Dashboard com os dados recebidos de um teste do K6.
no Grafana, devemos seguir os passos abaixo:

1. realizar o login no Grafana:

    ![login](https://raw.githubusercontent.com/lucas-silvs/estudo--k6-com-grafana-e-prometheus/main/images/login.png)

2. acessar aba de Dashboard's

    ![Home](https://raw.githubusercontent.com/lucas-silvs/estudo--k6-com-grafana-e-prometheus/main/images/home_grafana.png)


    Ao acessar a Home, devemos selecionar a opção de Dashboards.

3. Criar novo Dashboard

    ![Create_dashboard](https://raw.githubusercontent.com/lucas-silvs/estudo--k6-com-grafana-e-prometheus/main/images/create_dashboard.png)

    Deve selecionar o botão em azul **New** e selecionar a opção **Import**

4. Importar Dashboard JSON


    ![Select_Json_dashboard](https://raw.githubusercontent.com/lucas-silvs/estudo--k6-com-grafana-e-prometheus/main/images/select_json_dashboard.png)

    Selecione o arquivo Json disponibilizado na pasta Grafana:

    ```console
    ├── Grafana+Prometheus
    │   ├── docker-compose.yaml
    │   ├── grafana
    │   │   ├── dashboard
    │   │   │   └── dashboard-results.json
    
    ```

Ao importar o arquivo JSON, um Dashboard contendo os campos de resultados de teste do K6 será criado como o nome **Test Result

## Execução Teste de Carga e enviando Métricas para o Prometheus

A partir da versão 0.46 do K6, a extensão para envio de métricas para o Prometheus já é instalada por padrão, portanto não é necessário a instalação de uma extensão externa.

Para executar o script de teste de carga e exportar as métricas para o Prometheus, devemos adicionar uma flag para informar ao K6 que deve enviar as métricas para o endpoint do Prometheus. a flag informada é ``` experimental-prometheus-rw``` que informa para o k6 que os resultados do teste de carga deve ser exportado para um Prometheus

Por padrão, o endpoint definido para exportar métricas para o Prometheus é o http://localhost:9090/api/v1/write, mas esse endpoint pode ser alterado nas propriedades de options no script do k6 caso a exportação seja para um servidor externo,

Para executar o script de exemplo, execute o comando abaixo:

```console
k6 run -o experimental-prometheus-rw k6/load-test-exemplo-with-prometheus.js
```

Ao executar o teste, acesse o Dashboard [Test Result](http://localhost:3000/d/01npcT44k/test-result?orgId=1&refresh=10s) para validar se as métricas extão sendo exportadas corretamente:

![gif_dashboard_teste](https://raw.githubusercontent.com/lucas-silvs/estudo--k6-com-grafana-e-prometheus/main/images/metricas_exemplo_dashboard.gif)


## Referencias

- [K6](https://k6.io/docs/)
- [Docker](https://www.docker.com/)
- [Grafana](https://grafana.com/)
- [Prometheus](https://prometheus.io/)



