// Configuration JSON for skill sections
const skillSectionsConfig = [
  // Conhecimento
  {
    label: "Conhecimento",
    sectionId: "conhecimento",
    onClick: "handleSectionClick('conhecimento')",
    attribute: { label: "CON", dataAttribute: "con" },
    skills: [
      {
        name: "Cartografia",
        info: " Descrição: Implica na capacidade do jogador elaborarmapas e/ou compreender-los. <br><br><b>Nível 1:</b> Permite ao jogador ler qualquer tipo de mapasimples e se guiar por ele sem dificuldade. <br><br><b>Nível 2:</b> O segundo nível agracia o jogador com acapacidade de, dado um pouco de conhecimento deambiente, elaborar mapas ou preencher mapasincompletos. <br><br><b>Nível 3:</b> Ao terceiro nível, qualquer mapa pode ser lidopelo jogador (comuns e mágicos), além disso, o jogador écapaz de otimizar rotas e encontrar atalhos comfacilidade, dobrando a velocidade de viagem de qualquerum que o acompanhe. Por fim, o jogador podeconfeccionar mapas de altíssima qualidade.",
      },
      {
        name: "Ciências",
        info: "Mede a capacidade intelectual geral da personagem.<br><br><b>Nível 1:</b>Flat bônus de +1 para todas as rolagens de conhecimento. <br><br><b>Nível 2:</b>Aumento do flat bônus para +2. <br><br><b>Nível 3:</b>Aumento do flat bônus para +3.",
      },
      {
        name: "Demolição",
        info: "Mede a capacidade do personagem de elaborar explosivos improvisados.<br><br><b>Nível 1:</b>O jogador pode fazer uma bomba de fumaça (dura um turno e aplica o efeito de cego em uma área de 5m de raio) ou uma bomba de pólvora negra que faz muito barulho. O preço delas sendo:<br>Bomba de Fumaça: 10 de gold, necessita de 30 minutos para confecção;<br>Bomba de Pólvora: 20 de gold, necessita de 1 hora para confecção; <br><br><b>Nível 2:</b>O personagem poderá agora fazer uma amalgama de mana em suas bombas. Caso a bomba de fumaça seja melhorada durará 3 turnos. Já para a pólvora negra causará 4d4 de dano para qualquer unidade dentro de um raio de 5 metros. <br><br><b>Nível 3:</b>O jogador pode confeccionar uma bomba de alta potência. Esta bomba causa 20d10 de dano em um raio de 50 metros, ela requer: 1000 peças de ouro e 2 dias de confecção. Essa bomba pode causar efeitos extras a depender do mestre.",
      },
      {
        name: "Investigação",
        info: "Refere a capacidade do jogador de realizar uma busca de forma ativa de algo ou alguém.<br><br><b>Nível 1:</b>Flat bônus de +3 para rolagens desta perícia. <br><br><b>Nível 2:</b>Aumenta o flat bônus para +5 em rolagens desta perícia. <br><br><b>Nível 3:</b>A personagem pode encontrar o mercado negro de uma região.",
      },
      {
        name: "Matemática",
        info: "Mede o conhecimento do personagem em matemática para fazer uma análise rápida de trajetórias e afins.<br><br><b>Nível 1:</b>Projéteis físicos ou mágicos tem um aumento de 5 metros de alcance (vale para ataques de no mínimo 20 metros). <br><br><b>Nível 2:</b>Projéteis físicos ou mágicos tem um aumento de 15 metros de alcance (vale para ataques de no mínimo 20 metros). <br><br><b>Nível 3:</b>Projéteis físicos ou mágicos tem um aumento de 25 metros de alcance (vale para ataques de no mínimo 20 metros).",
      },
      {
        name: "Medicina",
        info: "Perícia utilizada para medir o conhecimento de um personagem em medicina, para poder efetuar testes de primeiro socorros em aliados ou NPCs.<br><br><b>Nível 1:</b> <br><br>Recebe um flat bônus de +3 para rolagens de medicina a cerca de conhecimentos teóricos, tais como sobre anatomia, uso de remédios, etc. O jogador pode usar uma ação para estabilizar um aliado caído ao chão sem ter de realizar qualquer teste de dificuldade ou então gastar recursos.<br><br><b>Nível 2:</b>Aumento do bônus para +5. O personagem recebe duas habilidades ao atingir este nível:<br> Primeiros Socorros: O personagem pode curar ferimentos de um jogador, dando a ele uma quantidade de pontos de vida igual a metade dos pontos de mana gastos para realizar a habilidade.<br>Intervenção: O jogador poderá utilizar uma ação e 20 pontos de mana para remover todos os pontos de um dentre os seguintes efeitos: envenenamento, sangramento, incendiado, congelado ou fraco. <br><br><b>Nível 3:</b>O personagem torna-se proficiente em realizar cirurgias, um teste deve ser realizado e um kit cirúrgico será consumido no processo, no entanto, o personagem pode remover qualquer lesão aplicada ao jogador. O processo cirúrgico demora até 12 horas (a critério do mestre) e aplica 2 pontos de exaustão (o procedimento pode devolver até membros amputados ou visão).",
      },
      {
        name: "Natureza",
        info: "Perícia sobre os conhecimentos do personagem com o mundo natural e fenômenos que possam ser correlacionados a ele ou ao mundo mágico.<br><br><b>Nível 1:</b>Flat bônus de +3 para rolagens desta perícia. <br><br><b>Nível 2:</b>Aumenta o flat bônus para +5 em rolagens desta perícia. <br><br><b>Nível 3:</b>A personagem recebe um desconto de 15 de gold na produção de venenos e poções.",
      },
      {
        name: "Planejamento",
      },
      {
        name: "Veterinária",
        info: "Dita o conhecimento do personagem sobre como tratar animais e fazer primeiros socorros neles.<br><br><b>Nível 1:</b>Recebe um flat bônus de +3 para rolagens de medicina a cerca de conhecimentos teóricos, tais como sobre anatomia, uso de remédios, etc, em animais. O jogador pode gastar uma ação para estabilizar um animal caído sem ser necessário fazer qualquer teste de dificuldade ou então gastar recursos. <br><br><b>Nível 2:</b>Aumento do bônus para +5. O personagem recebe duas habilidades ao atingir este nível:<br>Primeiros Socorros: O personagem pode curar ferimentos de um animal, dando a ele uma quantidade de pontos de vida igual a metade dos pontos de mana gastos para realizar a habilidade.<br>Intervenção: O jogador poderá utilizar uma ação e 20 pontos de mana para, em um animal, remover todos os pontos dos seguintes efeitos: envenenamento, sangramento, incendiado, congelado ou fraco. <br><br><b>Nível 3:</b>O personagem torna-se proficiente em realizar cirurgias em animais, um teste deve ser realizado e um kit cirúrgico será consumido no processo, no entanto, o personagem pode remover qualquer lesão ou 1 ponto de Morte aplicada ao animal, a menos de 1 semana. O processo cirúrgico demora até 12 horas (a critério do mestre) e aplica 2 pontos de exaustão (o procedimento pode devolver até membros amputados ou visão).",
      },
    ],
    prestigios: [
      {
        name: "Acadêmico",
        info: "Requisito: Você estuda com o professor Gabriel Ikawa.",
      },
      {
        name: "Mestre de Venenos",
        info: "Requisito: Conhecimento. O personagem é um especialista em criar e utilizar venenos.",
      },
    ],
  },
  {
    label: "Social",
    sectionId: "social",
    onClick: "handleSectionClick('social')",
    attribute: { label: "SOC", dataAttribute: "soc" },
    skills: [
      {
        name: "Contar Histórias",
        info: "Uma perícia que mede o quão bem seu personagem pode contar histórias. <br><br><b>Nível 1:</b>O personagem poderá contar histórias simples que são capazes de prender um pequeno grupo de NPC's na sua narrativa, podendo ser utilizado como forma de obter informações ou distração. <br><br><b>Nível 2:</b> Gasta uma ação e 7 de mana para que, a todos que ouçam uma história calma e pacífica, percam 1 ponto de medo, encantado e frenesi. <br><br><b>Nível 3:</b> A capacidade de contar histórias do seu personagem é tamanha que ele é capaz de prender completamente a atenção de um alvo. O alvo ficará tão entretido dentro da narrativa que ficará sob o efeito de encantado. Sendo então capaz de se obter um grande favor deste. O número de pontos de encantado aplicado será igual a duas vezes o número de horas contando a história e gastará 5 de mana por hora de história.",
      },
      {
        name: "Discursar",
        info: "Dita a capacidade do personagem em fazer discursos, podendo enganar, incentivar, repreender ou alegrar plateias. O discurso pode ser feito duas vezes por sessão independente de nível. <br><br><b>Nível 1:</b> O jogador consegue fazer um pequeno discurso que cativará até 3 pessoas a sua escolha. O discurso da 1 ponto de moral. Realizar o discurso consome uma ação e 5 de mana. <br><br><b>Nível 2:</b> A oratória do jogador é melhorada, garantindo que possa discursar para até 6 pessoas. <br><br><b>Nível 3:</b> Ao terceiro nível, o jogador pode fazer seu discurso inflamador, podendo aplicar o efeito de frenesi.",
      },
      {
        name: "Embromação",
        info: "Mede a capacidade do personagem em desviar a atenção de um NPC ou outro jogador, usando de direcionamento e prolixidade. <br><br><b>Nível 1:</b>O personagem pode tentar distrair a um NPC ou jogador, sendo necessário a realização de um teste para que, durante 1 minuto mantenha o alvo da embromação sob o efeito de 1 de Paralisado. Caso seja um combate, será gasto 12 de mana e feito um teste de social todo turno para conceder este ponto. <br><br><b>Nível 2:</b> O personagem pode tentar distrair a um NPC ou jogador, sendo necessário a realização de um teste para que, durante 2 minutos mantenha o alvo da embromação sob o efeito de 1 de Paralisado. Caso seja um combate, será gasto 10 de mana e feito um teste de social todo turno para conceder este ponto. <br><br><b>Nível 3:</b> O personagem pode tentar distrair a um NPC ou jogador, sendo necessário a realização de um teste para que, durante 4 minutos mantenha o alvo da embromação sob o efeito de 1 de Paralisado. Caso seja um combate, será gasto 8 de mana e feito um teste de social todo turno para conceder este ponto.",
      },
      {
        name: "Intimidação",
        info: "Utilizada para que um jogador tente dissuadir um NPC ou outro jogador, pode também ser usada em combates para gerar efeitos de medo ao alvo. <br><br><b>Nível 1:</b> Recebe um flat bônus de +3 para rolagens no dado. <br><br><b>Nível 2:</b> Aumento do flat bônus para +5. O jogador pode queimar uma ação e 4 de mana para intimidar o seu adversário. Aplicando 1 ponto de medo. <br><br><b>Nível 3:</b> O jogador pode gastar sua ação e 8 de mana para intimidar uma área ao seu redor cujo raio é de 5 metros. Todos os alvos dentro desta área receberão 1 ponto de medo.",
      },
      { name: "Intuição" },
      {
        name: "Mentira",
        info: "Implica na capacidade do personagem em elaborar mentiras ou então histórias ou argumentos falaciosos que sejam concisos. <br><br><b>Nível 1:</b> Recebe um flat bônus de +3 para rolagens no dado. <br><br><b>Nível 2:</b> Aumento do flat bônus para +5 para rolagens. <br><br><b>Nível 3:</b> Aumento do flat bônus para +7 para rolagens.",
      },
      {
        name: "Negociação",
        info: "Perícia para medir o quão bem seu personagem é capaz de negociar por novos preços e/ou trocas entre personagens. <br><br><b>Nível 1:</b> Recebe um flat bônus de +3 para rolagens no dado.<br><br><b>Nível 2:</b> Aumento do flat bônus para +5 para rolagens. O jogador é garantido de ter um desconto de 10% no valor do item de compra independente de rolagem. <br><br><b>Nível 3:</b> Acesso aos mercados negros, locais onde itens mais raros e mais poderosos podem ser encontrados, tão bem como qualquer outro objeto de contrabando ou então ilegal.",
      },
      {
        name: "Persuasão",
        info: "Dita o quão bem o jogador consegue alterar o posicionamento de outro personagem, ou NPC, para que ele consiga influencia-lo. <br><br><b>Nível 1:</b> Recebe um flat bônus de +3 para rolagens no dado. <br><br><b>Nível 2:</b> Aumento do flat bônus para +5 para rolagens. <br><br><b>Nível 3:</b> Aumento do flat bônus para +7 para rolagens.",
      },
      {
        name: "Sedução",
        info: "Mede a capacidade do personagem flertar com algum NPC. <br><br><b>Nível 1:</b> Flat bônus de +3 para rolagens desta perícia. <br><br><b>Nível 2:</b> Aumenta o flat bônus para +5 em rolagens desta perícia. A personagem pode usar uma ação e 5 de mana para aplicar 1 ponto de encantado. <br><br><b>Nível 3:</b> A personagem pode usar uma ação e 7 de mana para aplicar 1 ponto de hipnotizado.",
      },
    ],
    prestigios: [
      {
        name: "Folclore",
        info: "Requisito: Cultura ou Social. O personagem tem conhecimento profundo sobre tradições e lendas populares.",
      },
      {
        name: "Política",
        info: "Requisito: Cultura ou Social. O personagem entende os complexos sistemas políticos e é hábil em negociações diplomáticas.",
      },
    ],
  },
  {
    label: "Cultura",
    sectionId: "cultura",
    onClick: "handleSectionClick('cultura')",
    attribute: { label: "CUL", dataAttribute: "cul" },
    skills: [
      {
        name: "Belas Artes",
        info: "Utilizada para quando há a tentativa de expressar por meio da arte, com pinturas, músicas, literatura, etc. <br><br><b>Nível 1:</b> O jogador pode gastar 7 pontos de mana para aplicar dois pontos de confusão ou um ponto de encantado a um alvo. Após o termino do efeito, o mesmo alvo não pode sofrer efeitos dessa habilidade por 5 minutos.<br><br><b>Nível 2:</b> A personagem pode gastar uma ação para, dentro de um raio de 10m, revelar uma grande obra. Podendo assim, aumentar ou diminuir 1 ponto de moral de todos aqueles dentro da área até o seu próximo turno. Caso o jogador escolha diminuir um ponto todos os aliados e inimigos estarão sob esse mesmo efeito. <br><br><b>Nível 3:</b> Fazendo uma grande demonstração artística o jogador pode enaltecer os feitos e conquistas de outro personagem. Concedendo-lhe 1 ponto de Honrado, sendo preciso no mínimo 1 hora de tempo e 20 pontos de mana (a critério do mestre pode ser cobrado algum recurso a ser aplicado na forma de ouro, como tintas que custem 20 de gold).",
      },
      { name: "Costumes" },
      { name: "Erudito" },
      { name: "Misticismo" },
      {
        name: "Psicologia",
        info: "Dita a habilidade do personagem em ler outros seres sapientes, discernir intenções e auxiliar em tratamento de personagens e NPCs.<br><br><b>Nível 1:</b>O personagem pode gastar 15 pontos de mana para determinar se alguém esta mentindo para ele, sem necessidade de roll. <br><br><b>Nível 2:</b>As técnicas terapêuticas do personagem se ampliam, permitindo com que ele possa uma vez por dia tratar um ponto de insanidade de um aliado. <br><br><b>Nível 3:</b>O conhecimento do personagem em psicologia é tamanho que ele pode, uma vez por dia, conversar com o grupo e remover 1 ponto de insanidade do grupo inteiro.",
      },
      {
        name: "História",
        info: "Implica nos conhecimentos históricos do personagem a cerca de algum local, ambiente ou cultura. <br><br><b>Nível 1:</b> Para qualquer teste de história que vise obter informação sobre um povo, ambiente, local, pessoas há um bônus de +3 na rolagem. <br><br><b>Nível 2:</b> Há o aumento do bônus de rolagem para +5. A personagem melhora seu entendimento de ruínas, aumentando o bônus de ``Análise de Ruínas'' da perícia Folclore nível 3 de +5 para +7 pontos de folclore. <br><br><b>Nível 3:</b> O jogador pode gastar 1 dia estudando um artefato ou objeto mágico para entender a origem dele, tal como que povo a fez, de onde ela vem, características dela, etc. Caso o jogador possua Folclore nível 1, ele também recebe 4 pontos de folclore.",
      },
      {
        name: "Morfologia",
        info: "Seu personagem é capaz de entender línguas e fundamentos linguísticos, isso permite com que ele possa interpretar mensagens, escrita, etc. <br><br><b>Nível 1:</b> Seu personagem tem total proficiência na em um segundo idioma a escolha dele. <br><br><b>Nível 2:</b> Com mais conhecimento morfológico, o personagem conhece mais de línguas esquecidas ou perdidas, permitindo entender algumas palavras em cavernas, ruínas antigas, etc. O jogador também pode conhecer mais um idioma. <br><br><b>Nível 3:</b> O conhecimento em linguística do personagem é imenso, ele se torna capaz de compreender e identificar qualquer idioma desconhecido a critério do mestre.",
      },
      {
        name: "Performance",
        info: "Mede a habilidade do personagem em efetuar uma performance para poder fazer um show ou encantar uma plateia. <br><br><b>Nível 1:</b> Recebe um flat bônus de +3 para rolagens de performance. O personagem pode fazer uma performance para um pequeno público, deixando a maior parte dos ouvintes apenas desatentos por alguns minutos.<br><br><b>Nível 2:</b> Aumento do flat bônus de +5 em rolagens de performance. O conhecimento de palco do personagem aumenta, ele pode utilizar 10 pontos de mana para realizar uma grande performance de sua escolha que resultará no ganho de algumas moedas de ouro (a quantia de ouro advém de um teste de performance). Recebe 1 ponto de exaustão ao realizar a performance. <br><br><b>Nível 3:</b> Ao terceiro nível, o personagem além de receber mais ouro (a quantia de ouro advém de um teste de performance) no seu grande show, ele também pode receber itens da plateia (a critério do mestre) como forma de pagamento.",
      },
      {
        name: "Religião",
        info: "Mede o conhecimento do personagem sobre teologia e conhecimentos religiosos no geral. <br><br><b>Nível 1:</b> Recebe um flat bônus de +3 para conhecimento a cerca de religião. <br><br><b>Nível 2:</b> Aumento do flat bônus para +5. <br><br><b>Nível 3:</b> Desbloqueia técnicas avançadas de exercício da fé (Verificar perícia de Fé).",
      },
    ],
    prestigios: [
      {
        name: "Folclore",
        info: "Requisito: Cultura ou Social. O personagem tem conhecimento profundo sobre tradições e lendas populares.",
      },
      {
        name: "Fé",
        info: "Requisito: Cultura ou Magia. O personagem possui uma fé profunda que lhe concede poderes divinos.",
      },
    ],
  },
  {
    label: "Atletismo",
    sectionId: "atletismo",
    onClick: "handleSectionClick('atletismo')",
    attribute: { label: "ATL", dataAttribute: "atl" },
    skills: [
      {
        name: "Acrobacia",
        info: "Perícia para descrever as capacidades acrobáticas de um personagem para se deslocar no espaço. <br><br><b>Nível 1:</b> Flat bônus de +3 para rolagens desta perícia. <br><br><b>Nível 2:</b> Aumenta o flat bônus para +5 em rolagens desta perícia. A personagem ganha a capacidade de escalar superfícies verticais (a critério do mestre). <br><br><b>Nível 3:</b> Imunidade a dano de queda.",
      },
      {
        name: "Atlética",
        info: "Mede o condicionamento físico do personagem, indicando o quão bom ele sabe correr, nadar, etc. <br><br><b>Nível 1:</b> Aumento da velocidade de movimento em +2 m. <br><br><b>Nível 2:</b> Aumento da velocidade de movimento em +3 m. Totalizando (com o primeiro nível) 5 m de movimentação extra. <br><br><b>Nível 3:</b> Aumento da velocidade de movimento em +4 m. Totalizando (com o segundo nível) 9 m de movimentação extra.",
      },
      {
        name: "Carga",
        info: "Adiciona mais slots para que o jogador possa carregar seus itens de fácil acesso. <br><br><b>Nível 1:</b> O personagem ganha +1 slot. <br><br><b>Nível 2:</b> O personagem ganha +2 slots, totalizando 3 slots extras. <br><br><b>Nível 3:</b> O personagem ganha +3 slots, totalizando 6 slots extras.",
      },
      {
        name: "Constituição",
        info: "Apresenta a resistência física do jogador a certos efeitos. <br><br><b>Nível 1:</b> Caso a personagem fique inconsciente receba 1 ponto de inconsciente extra. A primeira vez que o jogador receber dano o suficiente para que sua vida chegue à 0 ou abaixo, sua vida será definida para 1 (esse efeito só pode ocorrer a cada 3 dias). <br><br><b>Nível 2:</b> O jogador pode gastar uma ação de reforço e 5 pontos de mana para remover 1d4 de pontos de alguma das seguintes condições: envenenado, congelado, decompondo, fraco, imobilizado, incendiado, lento, paralisado, sangramento. <br><br><b>Nível 3:</b> O jogador poderá escolher um efeito de dano para que possua resistência a ele, além de que o primeiro ponto de exaustão não possui efeito.",
      },
      {
        name: "Equilíbrio",
        info: "Define o quão bom o seu personagem é para movimentar seu corpo mantendo o equilíbrio, implicando na sua capacidade de se manter de pé mesmo frente adversidades. <br><br><b>Nível 1:</b> Flat bônus de +3 para rolagens desta perícia. <br><br><b>Nível 2:</b> Aumenta o flat bônus para +5 em rolagens desta perícia. Se o jogador não usar a sua ação de movimento, sua AD aumenta em +1 até o próximo turno. <br><br><b>Nível 3:</b> Não recebe ponto da condição Caído.",
      },
      {
        name: "Evasão",
        info: "Explicita a habilidade do personagem usar sua ação de reação para desviar de projéteis e áreas de efeito. <br><br><b>Nível 1:</b> Permite com que a personagem, ao receber dano por um ataque à distância de alvo único, use sua reação e 10 de MP para reduzir o dano pela metade.<br><br><b>Nível 2:</b> Mesma descrição do primeiro nível, no entanto, o dano é levado à zero. <br><br><b>Nível 3:</b> A personagem, caso receba dano por uma área de efeito, use sua reação e 10 de MP para reduzir o dano pela metade.",
      },
      {
        name: "Força",
        info: "Perícia utilizada para desbloquear armas do tipo PS, PDM e  auxilia no desbloqueio de ArcP. Os bônus aqui presente são válidos apenas para esses tipo de arma. <br><br><b>Nível 1:</b> O jogador pode usar 4 de mana e sua reação para, após realizar um ataque bem sucedido, aplicar 1 ponto de caído no alvo. <br><br><b>Nível 2:</b> O jogador recebe +4 de dano físico com armas pesadas. <br><br><b>Nível 3:</b> Utilizando sua ação de preparação e 10 de mana o jogador poderá realizar um ataque contundente, caso o ataque seja bem sucedido, o alvo sofrerá 1 ponto de Atordoado.",
      },
      {
        name: "Reflexos",
        info: "Perícia relativa aos reflexos do seu personagem, aprimorando suas capacidades de esquiva com ou sem armaduras. <br><br><b>Nível 1:</b>Ganho de +2 de AD para caso o jogador esteja ou sem armadura ou com uma armadura leve. <br><br><b>Nível 2:</b> O bônus de AD torna-se +3 e o efeito se aplica também para armaduras médias. <br><br><b>Nível 3:</b> O jogador pode utilizar 4 de mana para que em uma reação possa reduzir o dano de um ataque corpo a corpo em 2d8.",
      },
      {
        name: "Selvageria",
        info: "Mede a força por de trás dos ataques que a personagem realiza.",
      },
      {
        name: "Vontade",
        info: "A vontade é uma perícia que implica na capacidade psicológica do personagem em suportar situações de estresse tão bem como efeitos que sejam da psique..",
      },
    ],
    prestigios: [
      {
        name: "Furioso",
        info: "Requisito: Atletismo. O personagem pode entrar em fúria de batalha, aumentando significativamente suas habilidades físicas.",
      },
      {
        name: "Marcial",
        info: "Requisito: Combate. O personagem é um mestre em artes marciais e técnicas de combate avançadas.",
      },
    ],
  },
  {
    label: "Especialidade",
    sectionId: "especialidade",
    onClick: "handleSectionClick('especialidade')",
    attribute: { label: "ESP", dataAttribute: "esp" },
    skills: [
      { name: "Armeiro" },
      { name: "Arrombamento" },
      { name: "Cozinhar" },
      {
        name: "Escriba",
        info: "Permite com que o jogador possa copiar livros, pergaminhos e outros documentos escritos. O tempo de cópia e o custo de materiais fica a critério do mestre. <br><br><b>Nível 1:</b> Permite com que o personagem copie livros, pergaminhos e outros documentos escritos em nível 1 e com Prístino nível 1. <br><br><b>Nível 2:</b> Permite com que o personagem copie livros, pergaminhos e outros documentos escritos em nível 2 e com Prístino nível 2. <br><br><b>Nível 3:</b> Permite com que o personagem copie livros, pergaminhos e outros documentos escritos em nível 3 e com Prístino nível 3.",
      },
      {
        name: "Armoreiro",
        info: "Permite com que o jogador faça  armaduras pesadas. Materiais, custo e tempo de produção ficam a critério do mestre. <br><br><b>Nível 1:</b> Permite com que o personagem faça armaduras pesadas até nível 1 e com Prístino nível 1.<br><br><b>Nível 2:</b> Permite com que o personagem faça armaduras pesadas até nível 2 e com Prístino nível 2. O jogador pode fazer qualquer tipo de escudo. <br><br><b>Nível 3:</b> Permite com que o personagem faça armaduras pesadas até nível 3 e com Prístino nível 3 e, toda armadura moderada feita pelo personagem, pode receber uma propriedade a escolha, caso tenha os materiais necessários.",
      },
      {
        name: "Disfarce",
        info: "Mede a capacidade do personagem em alterar a aparência e enganar aos NPCs próximos. Mediante uma rolagem de manufatura com dificuldade definida pelo mestre, se houver uma falha os recursos são destruídos. Materiais, custo e tempo de produção ficam a critério do mestre. <br><br><b>Nível 1:</b> Utilizando de algumas tintas e plantas, o personagem pode fazer uma camuflagem básica. Recebe um bônus de +1d6 de furtividade para a pessoa camuflada. São necessários 5 de mana para isso.<br><br><b>Nível 2:</b> A personagem pode melhorar a aparência natural de um jogador, dando um bônus de +1d6 em rolagens de performance ou sedução. O custo de mana será de 7. <br><br><b>Nível 3:</b> O jogador consegue fazer uma maquiagem capaz de modificar a aparência geral da pessoa de maneira que esta receba +1d6 em rolagens de mentira para se passar por outra pessoa. São necessários 2 de mana para isso.",
      },
      {
        name: "Falsificação",
        info: "Permite com que o jogador fabrique documentos e/ou assinaturas falsificados. Mediante uma rolagem de manufatura com dificuldade definida pelo mestre, se houver uma falha o item é destruído. Materiais, custo e tempo de produção ficam a critério do mestre. <br><br><b>Nível 1:</b> Ao primeiro nível, o personagem pode efetuar uma rolagem para elaborar documentos simples que, ao serem apresentados a um personagem ou NPC. <br><br><b>Nível 2:</b> Ao segundo nível, o personagem pode elaborar assinaturas falsas e documentos mais robustos para apresentar. A personagem pode criar um documento falso de uso único que lhe garante +50 de Favor. <br><br><b>Nível 3:</b> No último nível, documentos utilizados em aristocracia, identidades, assinaturas e carimbos podem ser feitos pelo personagem de forma bem profissional. A personagem pode criar um notas promissórias falsas de uso único que lhe garantem 2d100 de gold.",
      },
      {
        name: "Ourives",
        info: "Permite com que o jogador possa fazer joias de diferentes níveis. Estas, são objetos que possuem encantamentos ou propriedades que podem ser usadas pela personagem. A confecção de uma joia exige materiais de alto padrão e alto grau de raridade, sendo, deixado a critério do mestre, o preço e método de obtenção. Recomendamos algo em torno de 10 vezes o preço de uma boa arma. Toda joia ocupa 1 slot. <br><br><b>Nível 1:</b> Permite o jogador fazer uma joia nível 1. Ela pode ter 1 encantamento (ver regras de Encantamento); <br><br><b>Nível 2:</b> O jogador pode fazer uma joia nível 2. Essa pode ter 1 propriedade (ver regras de Propriedade de Joias); <br><br><b>Nível 3:</b> No terceiro nível, o jogador pode criar joias nível 3. Essas podem ter uma encantamento e uma propriedade, simultaneamente.",
      },
    ],
    prestigios: [
      {
        name: "Artíficer",
        info: "Requisito: Manufatura. O personagem é um mestre artesão capaz de criar itens mágicos e artefatos complexos.",
      },
      {
        name: "Alquimia",
        info: "Requisito: Conhecimento ou Magia. O personagem é versado na arte da alquimia e criação de poções.",
      },
    ],
  },
  {
    label: "Combate",
    sectionId: "combate",
    onClick: "handleSectionClick('combate')",
    attribute: { label: "COM", dataAttribute: "com" },
    skills: [
      {
        name: "Acurácia",
        info: "Perícia responsável para desbloquear a capacidade de armas à distância. <br><br><b>Nível 1:</b>Permite o arremesso de armas leves de arremesso (ALA) com distância de até 15 metros. <br><br><b>Nível 2:</b>Bestas podem ser recarregadas com a ação de preparo, arcos pesados podem começar a acertar alvos a partir de 15 metros.  <br><br><b>Nível 3:</b>Permite com que o personagem possa atingir adversários até duas vezes a distância máxima de armas do tipo Arc ao custo de 5 de mana.",
      },
      {
        name: "Ambidestria",
        info: "Dita a capacidade do personagem no domínio do uso das duas mãos, permitindo com que ele possa utilizar duas armas, uma em cada uma de suas mãos. Também auxilia no desbloqueio das armas de tipo Arc e ArcP. <br><br><b>Nível 1:</b>Permite o uso de duas armas leves distintas simultaneamente pelo personagem. Para o combate, é possível utilizar a ação de reforço para desferir um golpe com a arma que esteja na segunda mão (sendo necessário um segundo teste de combate). Esse bônus não é válido para armas Arc. <br><br><b>Nível 2:</b>O personagem pode utilizar armas longas ou cortante/perfurante simples na mão dominante. Esse bônus não é válido para armas Arc.  <br><br><b>Nível 3:</b>O personagem pode usar sua reação e 1 ponto de mana para rolar o dado de dano de sua arma secundária, reduzindo o dano de um ataque corpo a corpo, não mágico, neste valor. Esse bônus não é válido para armas Arc. ",
      },
      { name: "Combate Desarmado" },
      {
        name: "Combate Improvisado",
        info: "Habilidade referente à capacidade de criar armas improvisadas ou então entrar em combate desarmado. <br><br><b>Nível 1:</b>O jogador usará 1d4 de dano para ataques desarmados. Além disso, o jogador pode utilizar objetos ao seu redor, como galhos, garrafas, pedras como armas improvisadas, essas armas dão 1d6 de dano e tem 1 uso <br><br><b>Nível 2:</b>O dano do jogador, para ataques desarmados, é aumentado para 2d4. O jogador ganha uma maior proficiência com armas improvisadas, fazendo com que essas causem 1d10 de dano e tenham 6 usos.  <br><br><b>Nível 3:</b>O dano para ataques desarmados torna-se 3d4. O jogador, ao realizar um ataque com arma improvisada, pode usar sua ação de reforço para realizar um novo ataque. ",
      },
      {
        name: "Esgrima",
        info: "Perícia que dita a capacidade de usar armas corpo a corpo leves do tipo CPS e CPP. Os bônus aqui presente são válidos apenas para esses tipo de arma. <br><br><b>Nível 1:</b>.Ataques com armas CPS e CPP aplicam, passivamente, 1 ponto de sangramento se houver sucesso (só pode ocorrer 1 vez por turno). <br><br><b>Nível 2:</b>Remove a restrição de turno do nível anterior.  <br><br><b>Nível 3:</b>O personagem pode realizar um ataque lesionante ao custo de 10 pontos de mana. Caso o ataque seja bem sucedido, o jogador deverá rolar 1d100 e averiguar a lesão. ",
      },
      {
        name: "Longa Vista",
        info: "Utilizada para desbloquear armas dos tipos AL e LP. Os bônus aqui presente são válidos apenas para esses tipo de arma. <br><br><b>Nível 1:</b>Recebe +1.5 metro de área de ameaça. <br><br><b>Nível 2:</b>O jogador pode utilizar da sua ação de reforço para realizar um ataque de pomo em outro alvo que causa 1d6 de dano.  <br><br><b>Nível 3:</b>Ataques com armas AL e LP queimam a reação do alvo. ",
      },
      {
        name: "Oportunista",
        info: "Perícia que é usada para garantir ataques de oportunidade ao jogador uma vez que um monstro/adversário fuja/entre do seu raio de ataque. <br><br><b>Nível 1:</b>Desbloqueia a reação do ataque de oportunidade para ataques corpo a corpo. <br><br><b>Nível 2:</b>Desbloqueia a reação do ataque de oportunidade para armas ranged, este não pode acontecer caso você esteja no raio de ameaça de uma criatura inimiga.  <br><br><b>Nível 3:</b>Desbloqueia a reação do ataque de oportunidade para magias individuais e touch, essa reação não pode ser usada caso você esteja no raio de ameaça de uma criatura inimiga.",
      },
      {
        name: "Bimanual",
        info: "Implica na capacidade do jogador de desbloquear armas do tipo CDM, PDM, CPP, LP e auxilia no desbloqueio da Best. Os bônus aqui presente são válidos apenas para esses tipo de arma. <br><br><b>Nível 1:</b>O raio de ameaça do jogador aumenta em 1.5 metro, exceto para Best e CDM. <br><br><b>Nível 2:</b>Reduz o slot das armas citadas em 1.  <br><br><b>Nível 3:</b>Permite gastar a ação de movimento e 4 de mana para aumentar o dano da arma em 1 dado de dano do nível 1 da sua arma até o seu próximo turno. ",
      },
      { name: "Prístino" },
      { name: "Presságio" },
    ],
    prestigios: [
      {
        name: "Marcial",
        info: "Requisito: Combate. O personagem é um mestre em artes marciais e técnicas de combate avançadas.",
      },
      {
        name: "Furioso",
        info: "Requisito: Atletismo. O personagem pode entrar em fúria de batalha, aumentando significativamente suas habilidades físicas.",
      },
    ],
  },
  {
    label: "Sobrevivência",
    sectionId: "sobrevivencia",
    onClick: "handleSectionClick('sobrevivencia')",
    attribute: { label: "SOB", dataAttribute: "sob" },
    skills: [
      {
        name: "Acampamento",
        info: "Mede o conhecimento do personagem em montar estruturas para um acampamento. <br><br><b>Nível 1:</b> O personagem é capaz de montar pequenas armadilhas para captura de animais pequenos, gastando 40 minutos para tal. Garante 1 ração. <br><br><b>Nível 2:</b> A personagem pode montar um acampamento de alto nível, gastando 2 horas para poder escolher uma condição e remover 1 ponto dela. As condições incluem: Exaustão, Insanidade ou Envenenado. <br><br><b>Nível 3:</b> Um acampamento de alto padrão pode ser realizado, mantendo o efeito do nível 2 e adicionando o ganho de 1 ponto de Honrado pelo remanescente do dia, ao custo de 2 horas de preparo e 1000 de gold em materiais.",
      },
      {
        name: "Adestramento",
        info: "Dita a capacidade do personagem de discernir as intenções ou maneirismos de um animal. <br><br><b>Nível 1:</b> Flat bônus de +3 para entender o comportamento ou se comunicar com animais. Animais domésticos gostam muito do seu personagem. <br><br><b>Nível 2:</b> Aumenta o flat bônus para +5 em rolagens desta perícia. A personagem pode chamar sua montaria em um raio de 3 km. <br><br><b>Nível 3:</b> Criaturas convencionais não são agressivas contra o jogador (averiguar com o mestre quais se enquadram nesse critério).",
      },
      {
        name: "Arrombamento",
        info: "Mede a capacidade do personagem em destravar trancas, cadeados ou mecanismos. A ausência de qualquer ponto nessa perícia garante que, qualquer ganzua usada, e o teste seja uma falha, será consumido. <br><br><b>Nível 1:</b> Para qualquer rolagem de natureza de ganzua recebe um bônus de +3 na rolagem. <br><br><b>Nível 2:</b> O bônus é aumentado para +5 e é possível tentar abrir baús com fechaduras mágicas (a critério do mestre). <br><br><b>Nível 3:</b> O jogador pode abrir qualquer baú de fechadura não mágica sem realizar um teste. Fora isso, o jogador também não ativa mecanismos de alarme ou armadilhas (isso incluí baús mímicos, que são considerados mágicos).",
      },
      {
        name: "Bater Carteira",
        info: "Perícia utilizada para que um personagem possa roubar um NPC ou outro personagem de maneira furtiva. <br><br><b>Nível 1:</b> Para qualquer rolagem de natureza de bater carteira recebe um bônus de +3 na rolagem. <br><br><b>Nível 2:</b> Aumento do bônus de rolagem para +5. Fora isso você também pode andar pelas ruas e, sem realizar rolagens, roubar ouro das pessoas que ficam andando (a quantia de ouro é definida pelo mestre). <br><br><b>Nível 3:</b> Libera a possibilidade de fazer testes de bater carteira para implantar objetos nos outros ao invés de rouba-los.",
      },
      {
        name: "Furtividade",
        info: "Perícia que mede o quão bem o seu personagem é capaz de se manter oculto e/ou omisso em um dado ambiente. <br><br><b>Nível 1:</b> Para cada rolagem que enfoque em ficar furtivo, se esconder, recebe um bônus de +3 na rolagem. <br><br><b>Nível 2:</b> O bônus é aumentado para +5 e em áreas com alta densidade populacional o bônus torna-se +7.  <br><br><b>Nível 3:</b> Todos os aliados que estejam fazendo um teste de furtividade com o jogador e não possuam nenhum ponto na perícia recebem o bônus de +3 na rolagem.",
      },
      {
        name: "Improviso",
        info: "Habilidade para que o personagem seja capaz de gerar um leve improviso em uma situação, gerando-lhe algum tipo de vantagem menor. <br><br><b>Nível 1:</b> Uma vez por dia pode-se adicionar 1d6 para qualquer rolagem sua. <br><br><b>Nível 2:</b> Duas vezes por dia pode-se adicionar 1d6 para qualquer rolagem sua. <br><br><b>Nível 3:</b> Três vezes por dia pode-se adicionar 1d6 para qualquer rolagem sua.",
      },
      {
        name: "Montar Armadilhas",
        info: "Dita a capacidade do personagem em montar armadilhas para capturar pessoas ou animais. <br><br><b>Nível 1:</b> Com os conhecimentos de montagem de armadilha, a personagem pode montar um sistema de alarme ao redor de uma área. Custando 1 de gold por 15 metros quadrados. Uma criatura que adentrar essa área soará um alarme sonoro. <br><br><b>Nível 2:</b> Uma personagem pode gastar 1 dia para realizar fortificações ao redor de uma área. A personagem e seus aliados terão +2 de AD em combates dentro da área fortificada. A personagem gasta 5 de gold por 10 metros quadrados. <br><br><b>Nível 3:</b> Uma personagem pode gastar mais um dia para que suas fortificações sejam ainda mais poderosas. A personagem e seus aliados terão +1d6 em rolagens de combate dentro da área. A área afetada deve ser a mesma da área fortificada e custará 50 de gold por 10 metros quadrados.",
      },
      {
        name: "Montaria",
        info: "Uma perícia utilizada para poder averiguar o quão bem o personagem consegue se conectar com sua montaria. <br><br><b>Nível 1:</b> Ao primeiro nível, o personagem cria facilidade em ter animais não mágicos de médio porte de maior velocidade, permitindo com que ele possa ter animais de até 30 m em velocidade de corrida (ex: cavalo).<br><br><b>Nível 2:</b> A capacidade de criar vínculos se torna mais intensa, isso permite com que se possa ter animais de grande porte (como elefantes), ou então animais ainda mais rápidos de movimentação até 60 m. <br><br><b>Nível 3:</b> Por fim, o personagem consegue se conectar tão bem com os animais que pode ter uma montaria mágica ou alada. Isso permite também que ele possa ter montarias que cheguem a velocidades muito altas de 90 m.",
      },
      {
        name: "Rastreio",
        info: "Perícia para medir como o personagem consegue rastrear outras criaturas ou pessoas, obtendo informações sobre seus rastros. <br><br><b>Nível 1:</b> Para qualquer rolagem de natureza de rastreio recebe um bônus de +3 na rolagem. <br><br><b>Nível 2:</b> Aumento do bônus de rolagem para +5, junto a isso você pode escolher uma dentre as seguintes classes: animais, humanoide ou seres mágicos e o seu bônus será de +7. <br><br><b>Nível 3:</b> Seu personagem marca um alvo e é capaz de saber com clareza para onde ele foi dentro de uma distância de 10 km.",
      },
      {
        name: "Percepção",
        info: "Mede a capacidade do jogador em perceber seus arredores e mudanças no ambiente ao qual ele se encontra. <br><br><b>Nível 1:</b> Para qualquer rolagem de natureza de percepção recebe um bônus de +3 na rolagem. <br><br><b>Nível 2:</b> Aumento do bônus de rolagem para +5. <br><br><b>Nível 3:</b> Aumento do bônus de rolagem para +7 e o bônus aumenta para +10 se for percepção de armadilha.",
      },
      { name: "Sutil" },
    ],
    prestigios: [
      {
        name: "Companheiro Animal",
        info: "Requisito: Sobrevivência. O personagem possui um companheiro animal leal que o auxilia em aventuras.",
      },
      {
        name: "Mestre de Venenos",
        info: "Requisito: Conhecimento. O personagem é um especialista em criar e utilizar venenos.",
      },
    ],
  },
  {
    label: "Magia",
    sectionId: "magia",
    onClick: "handleSectionClick('magia')",
    attribute: { label: "MAG", dataAttribute: "mag" },
    skills: [
      {
        name: "Bênçãos",
        info: "Nível 1: Desbloqueia a essência nível 1do Hemisfério de Suporte. Nível 2: Magias feitas apenas com a essência de nível 1 do Hemisfério de Suporte recebem um modificador de 0.85 no custo final de MP. Nível 3: Aumenta o dado natural de cura da essência nível 1 do Hemisfério de Suporte para d6 ao invés de d4.",
      },
      {
        name: "Conjuração",
        info: "Nível 1: Desbloqueia a essência nível 1 do Hemisfério Mecânico. Nível 2: Magias que possuam a Mecânica de Imbuir podem durar 1 turno a mais sem custo adicional (ex: se ela durar 1 turno, ela passa a durar 2). Nível 3: Magias que tenham a mecânica de Golenmância possuem um modificador extra de 0.85 no custo final de MP.",
      },
      {
        name: "Contra-Feitiço",
        info: "Nível 1: A personagem pode, ao ver a execução de uma magia, utilizar sua reação e 15 de MP para negar essa ativação. Essa habilidade só pode ser utilizada 1 vez por dia. Nível 2: Reduz o preço de MP para 5 MP. Nível 3: A personagem pode utilizar um contra-feitiço até 2 vezes por dia.",
      },
      {
        name: "Energia",
        info: "Nível 1: Desbloqueia a essência nível 1 do Hemisfério de Dano. Nível 2: Magias feitas apenas com a essência nível 1 do Hemsifério de Dano recebem um modificador de 0.85 no custo final de MP. Nível 3: Todas as essências do Hemisfério de Dano recebem um dano extra fixo de +1 do tipo de dano escolhido na essência (ex: 2d4 físico tornam-se 2d4 + 1 físico).",
      },
      {
        name: "Feitiçaria",
        info: "Nível 1: Adiciona um modificador de 0.95 de preço de MP. Nível 2: Amplifica o modificador para 0.9 de preço de MP. Nível 3: Intensifica ainda mais o modificador para 0.85 de preço de MP.",
      },
      {
        name: "Ilusionismo",
        info: "Nível 1: Desbloqueia a essência nível 1 do Hemisfério Mental. Nível 2: Magias que utilizem apenas 1 essência do Hemisfério Mental podem utilizar duas Propriedades de Ambiente ao invés de uma. Nível 3: Magias que apenas tenham Efeitos Mecânicos de Duração e as seguintes Propriedades de Ambiente: Eco I/II, Miragem I/II, Perfume I/II ou Contato recebem um modificador de 0.75 no preço final de MP.",
      },
      {
        name: "Invocador",
        info: "Nível 1: Invoca o familiar com aspecto da escolha do jogador e escolhe 1 habilidade da tabela. Nível 2: Pode escolher mais uma habilidade. Nível 3: Permite escolher a terceira habilidade, o jogador substituir uma das habilidade escolhidas anteriormente. ",
      },
      {
        name: "Ocultismo",
        info: "Nível 1: Desbloqueia a essência nível 1 do Hemisfério Corpóreo. Nível 2: Magias feitas apenas com a essência nível 1 do Hemsifério Corpóreo recebem um modificador de 0.85 no custo final de MP. Nível 3: O jogador pode escolher um alvo a até 15 metros e definir uma quantia de até 40 MP a queimar, ao se obter sucesso em um teste de Magia contra a RM do alvo a quantia escolhida será aplicada na forma de dano necrótico contra ele. ",
      },
      {
        name: "Shamanismo",
        info: "Nível 1: Desbloqueia a essência nível 1 do Hemisfério Estrutural. Nível 2: Magias feitas apenas com a essência nível 1 do Hemsifério Estrutural recebem um modificador de 0.85 no custo final de MP. Nível 3: Desbloqueia a essência nível 2 do Hemisfério Estrutural.",
      },
    ],
    prestigios: [
      {
        name: "Acadêmico",
        info: "Requisito: Magia. O personagem tem conhecimento acadêmico avançado em áreas mágicas e teóricas.",
      },
      {
        name: "Fé",
        info: "Cabelo falou",
      },
    ],
  },
];
