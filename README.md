<p align="center">
<img src="http://i.imgur.com/4KVB44N.png" width="450">
</p>
<br>
# Functional statements
## Vision Statement
> Esta plataforma com formato de rede social promoverá as capacidades especiais e as histórias inspiradoras de cada uma das pessoas portadoras de deficiência, favorecendo, assim, a sua integração no mercado de trabalho. Cada pessoa-trabalhador com deficiência é um individuo único e com um leque diverso de aptidões, competências, conhecimentos e habilidades. É necessário, no entanto, criar condições para que o seu talento seja inteiramente potenciado, valorizado e comunicado, fazendo eco na sociedade.
A plataforma de rede social dará também acesso às organizações que queiram recrutar pessoas com algumas limitações, de forma a facilitar o encontro entre oferta e procura. Posteriormente, essas organizações poderão comunicar essas ações como Responsabilidade Social e poderão, ainda, ver reconhecido o sucesso da adesão dando os seus testemunhos.
O projeto tem como tónica a comunicação destas pessoas e das suas capacidades numa rede social que promoverá o encontro das mesmas e ajudará ao mesmo tempo a partilharem histórias e unir forças, promovendo processos de troca de experiências e apoio mútuo.
Por tudo isto, terá que ser uma plataforma que tecnologicamente seja intuitiva e realmente acessível à maioria das pessoas com vários tipos de incapacidades, sendo este o maior desafio tecnológico da mesma.

***
# Technical statements

### Continuous Integration

| URL                                     | Status     |
|---------------------------------------- |------------|
|https://travis-ci.com/Sk0ut/herois-reais |![alt tag](https://api.travis-ci.com/Sk0ut/herois-reais.svg?token=npr6Ddr9yYYkxLyV7PFN)|

### Servers
| Type                | URL                              | Status                          |
| --------------------|----------------------------------|:-------------------------------:|
| Staging/Production  | http://178.62.20.127:8080/       | OK                              |
| Production          | https://inclusivin.herokuapp.com/| Temporarily down for maintenance|

### Commands

#### Run Application
```javascript
npm install
npm start
gulp serve
```

#### Run Tests
```javascript
npm install
npm test
/* generates report on the path
'mochawesome-reports/mochawesome.html'*/
```

#### Software Documentation
```javascript
npm install
gulp build:docs
// generates documentation on the 'docs' folder
```

See also the documentation for the [vulgar development kit](https://github.com/datatypevoid/vulgar) used in the project.
