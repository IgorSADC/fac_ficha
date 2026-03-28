// Dice rolling functions

function rollAttribute(attributeKey, attributeName) {
  const attributeInput = document.querySelector(
    `input[data-attribute="${attributeKey}"]`
  );
  if (!attributeInput) {
    alert(`Atributo ${attributeName} não encontrado!`);
    return;
  }

  const attributeLevel = parseInt(attributeInput.value) || 0;

  // Roll dice based on attribute level
  const diceCount = attributeLevel + 2; // +2 for base dice
  const rolls = [];

  for (let i = 0; i < diceCount; i++) {
    rolls.push(Math.floor(Math.random() * 6) + 1);
  }

  const total = rolls.reduce((sum, roll) => sum + roll, 0);
  const result = `🎲 ${attributeName} (${diceCount}d6): [${rolls.join(
    ", "
  )}] = ${total}`;

  alert(result);
  console.log(result);
}

function rollSkill(sectionId, skillName) {
  // Find the skill configuration
  const config = skillSectionsConfig.find(
    (c) => c.sectionId === sectionId
  );
  if (!config || !config.attribute) {
    alert(`Configuração não encontrada para ${skillName}!`);
    return;
  }

  // Get attribute level
  const attributeInput = document.querySelector(
    `input[data-attribute="${config.attribute.dataAttribute}"]`
  );
  if (!attributeInput) {
    alert(`Atributo ${config.attribute.label} não encontrado!`);
    return;
  }
  const attributeLevel = parseInt(attributeInput.value) || 0;

  // Get skill level
  const skillContainer = document.querySelector(
    `[data-skill="${skillName}"][data-section="${sectionId}"]`
  );
  if (!skillContainer) {
    alert(`Habilidade ${skillName} não encontrada!`);
    return;
  }

  const levelCheckboxes = skillContainer.querySelectorAll(
    ".skill-level:checked"
  );
  let skillLevel = 0;
  levelCheckboxes.forEach((checkbox) => {
    const level = parseInt(checkbox.dataset.level);
    if (level > skillLevel) skillLevel = level;
  });

  const flatBonus = 0; // Placeholder for flat bonus logic

  const diceCount = attributeLevel + 2; // +2 for base dice
  const rolls = [];

  for (let i = 0; i < diceCount; i++) {
    rolls.push(Math.floor(Math.random() * 6) + 1);
  }

  const flatBonusString = flatBonus > 0 ? ` + ${flatBonus}` : "";

  const total = rolls.reduce((sum, roll) => sum + roll, 0) + flatBonus;
  const result = `🎲 ${skillName} (${diceCount}d6): [${rolls.join(
    ", "
  )}] ${flatBonusString} = ${total}`;

  alert(result);
  console.log(result);
}

// Function to show summary of manual rolls
function showManualRollSummary(resourceName, manualRolls) {
  if (manualRolls.length === 0) return;

  let summary = `🎲 Rolls Manuais - ${resourceName}:\n\n`;
  let totalGained = 0;

  manualRolls.forEach((roll) => {
    summary += `Nível ${roll.level}: Rolou ${roll.roll} no ${roll.diceType}\n`;
    totalGained += roll.roll;
  });

  summary += `\nTotal ganho nos rolls: +${totalGained}`;
  summary += `\nHistórico automático foi substituído pelos rolls manuais.`;

  alert(summary);
}

// Function to show summary of automatic rolls
function showAutoRollSummary(levelsRolled) {
  if (levelsRolled.length === 0) return;

  let summary = `🎲 Rolls Automáticos - Níveis ${levelsRolled.join(
    ", "
  )}:\n\n`;

  resourceSectionsConfig.forEach((config) => {
    const history = getResourceRollHistory(config.resourceName);
    const levelRolls = history.filter((entry) =>
      levelsRolled.includes(entry.level)
    );

    if (levelRolls.length > 0) {
      summary += `${config.resourceName}:\n`;
      levelRolls.forEach((roll) => {
        summary += `  Nível ${roll.level}: ${roll.roll} no ${roll.diceType}\n`;
      });

      const totalGained = levelRolls.reduce(
        (sum, roll) => sum + roll.roll,
        0
      );
      summary += `  Total ganho: +${totalGained}\n\n`;
    }
  });

  summary += `Clique no botão "📋 Histórico" para ver todos os rolls detalhados.`;
  alert(summary);
}

// Function to parse dice string and roll dice
function parseDiceStringAndRoll(diceString) {
  try {
    // Split by + to handle multiple dice types (e.g., "2d4 + 1d6")
    const diceParts = diceString.split("+").map((part) => part.trim());
    let total = 0;
    const details = [];

    for (const part of diceParts) {
      const diceMatch = part.match(/(\d+)d(\d+)/);
      if (!diceMatch) {
        return { error: `Formato de dado inválido: ${part}` };
      }

      const count = parseInt(diceMatch[1]);
      const sides = parseInt(diceMatch[2]);

      if (count <= 0 || sides <= 0) {
        return { error: `Valores inválidos: ${count}d${sides}` };
      }

      const rolls = [];
      let partTotal = 0;
      for (let i = 0; i < count; i++) {
        const roll = Math.floor(Math.random() * sides) + 1;
        rolls.push(roll);
        partTotal += roll;
      }

      total += partTotal;
      details.push(
        `${count}d${sides}: [${rolls.join(", ")}] = ${partTotal}`
      );
    }

    return {
      total: total,
      details: details,
      error: null,
    };
  } catch (error) {
    return { error: `Erro ao processar dados: ${error.message}` };
  }
}
