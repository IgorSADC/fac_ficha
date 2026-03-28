// Character management, resources, skills, save/load

// Function to update dice selector availability based on character level
function updateDiceSelectorAvailability() {
  const level =
    parseInt(document.getElementById("character-level")?.textContent) || 0;
  const diceSelectors = document.querySelectorAll(".dice-selector");

  diceSelectors.forEach((selector) => {
    if (level > 0) {
      selector.disabled = true;
      selector.style.opacity = "0.5";
      selector.style.cursor = "not-allowed";
    } else {
      selector.disabled = false;
      selector.style.opacity = "1";
      selector.style.cursor = "pointer";
    }
  });
}

// Function to calculate resource total (Base + Extra = Total)
function calculateResourceTotal(resourceName) {
  const config = resourceSectionsConfig.find(
    (c) => c.resourceName === resourceName
  );
  if (!config) return;

  const baseInput = document.getElementById(config.baseId);
  const extraInput = document.getElementById(config.extraId);
  const totalInput = document.getElementById(config.totalId);

  if (baseInput && extraInput && totalInput) {
    const baseValue = parseInt(baseInput.value) || 0;
    const extraValue = parseInt(extraInput.value) || 0;
    const total = baseValue + extraValue;

    totalInput.value = total;

    clearTimeout(window.saveTimeout);
    window.saveTimeout = setTimeout(() => {
      saveCharacterDataToStorage();
    }, 500);
  }
}

// Roll function for resource dice (HP, Mana, etc.)
function rollResourceDice(resourceName, diceSelectId) {
  const diceSelect = document.getElementById(diceSelectId);
  if (!diceSelect) {
    alert(`Seletor de dado para ${resourceName} não encontrado!`);
    return;
  }

  const level =
    parseInt(document.getElementById("character-level")?.textContent) || 0;
  const diceType = diceSelect.value;
  const diceSides = parseInt(diceType.substring(1));

  if (level === 0) {
    const maxValue = diceSides;
    initializeResourceBase(resourceName, maxValue, diceType);

    const result = `🎲 ${resourceName} (Nível 0): Base inicializada com valor máximo ${maxValue}`;
    alert(result);
    console.log(result);
  } else {
    const confirmMessage = `Isso irá substituir todos os rolls automáticos com rolls manuais.\n\nDeseja continuar e rolar manualmente para ${resourceName}?`;
    if (!confirm(confirmMessage)) {
      return;
    }

    clearResourceHistoryAndStartManual(resourceName, diceType, level);
  }
}

// Function to clear automatic history and start manual rolling
function clearResourceHistoryAndStartManual(resourceName, diceType, currentLevel) {
  const config = resourceSectionsConfig.find(
    (c) => c.resourceName === resourceName
  );
  if (!config) return;

  const existingHistory = getResourceRollHistory(resourceName);
  const level0Entry = existingHistory.find((entry) => entry.level === 0);

  let newHistory = [];
  let baseValue = 0;

  if (level0Entry) {
    newHistory.push(level0Entry);
    baseValue = level0Entry.roll;
  } else {
    const diceSides = parseInt(diceType.substring(1));
    const maxValue = diceSides;
    newHistory.push({
      level: 0,
      roll: maxValue,
      diceType: diceType,
      description: `Nível 0: Valor máximo do ${diceType}`,
    });
    baseValue = maxValue;
  }

  for (let level = 1; level <= currentLevel; level++) {
    const diceSides = parseInt(diceType.substring(1));
    const roll = Math.floor(Math.random() * diceSides) + 1;
    baseValue += roll;

    newHistory.push({
      level: level,
      roll: roll,
      diceType: diceType,
      description: `Nível ${level}: Rolou ${roll} no ${diceType} (manual)`,
    });
  }

  const baseInput = document.getElementById(config.baseId);
  if (baseInput) {
    baseInput.value = baseValue;
  }

  saveResourceRollHistory(resourceName, newHistory);

  showManualRollSummary(
    resourceName,
    newHistory.filter((entry) => entry.level > 0)
  );

  calculateResourceTotal(resourceName);
}

// Function to initialize base resource at level 0
function initializeResourceBase(resourceName, baseValue, diceType) {
  const config = resourceSectionsConfig.find(
    (c) => c.resourceName === resourceName
  );
  if (!config) return;

  const baseInput = document.getElementById(config.baseId);
  if (baseInput) {
    baseInput.value = baseValue;
  }

  const rollHistory = [
    {
      level: 0,
      roll: baseValue,
      diceType: diceType,
      description: `Nível 0: Valor máximo do ${diceType}`,
    },
  ];

  saveResourceRollHistory(resourceName, rollHistory);
  calculateResourceTotal(resourceName);
}

// Function to roll dice and add to resource base
function rollAndAddToResource(resourceName, diceType, level) {
  const config = resourceSectionsConfig.find(
    (c) => c.resourceName === resourceName
  );
  if (!config) return;

  const baseInput = document.getElementById(config.baseId);
  if (!baseInput) return;

  const diceSides = parseInt(diceType.substring(1));
  const roll = Math.floor(Math.random() * diceSides) + 1;
  const currentBase = parseInt(baseInput.value) || 0;
  const newBase = currentBase + roll;

  baseInput.value = newBase;

  const existingHistory = getResourceRollHistory(resourceName);
  existingHistory.push({
    level: level,
    roll: roll,
    diceType: diceType,
    description: `Nível ${level}: Rolou ${roll} no ${diceType}`,
  });

  saveResourceRollHistory(resourceName, existingHistory);

  const result = `🎲 ${resourceName} (Nível ${level}): Rolou ${roll} no ${diceType}. Base: ${currentBase} + ${roll} = ${newBase}`;
  alert(result);
  console.log(result);

  calculateResourceTotal(resourceName);
}

// Function to save resource roll history
function saveResourceRollHistory(resourceName, rollHistory) {
  const key = `${SAVE_PREFIX}${resourceName.toLowerCase()}_roll_history`;
  try {
    localStorage.setItem(key, JSON.stringify(rollHistory));
  } catch (error) {
    console.error(`Error saving roll history for ${resourceName}:`, error);
  }
}

// Function to get resource roll history
function getResourceRollHistory(resourceName) {
  const key = `${SAVE_PREFIX}${resourceName.toLowerCase()}_roll_history`;
  try {
    const history = localStorage.getItem(key);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error(`Error loading roll history for ${resourceName}:`, error);
    return [];
  }
}

// Function to show resource roll history
function showResourceRollHistory(resourceName) {
  const history = getResourceRollHistory(resourceName);

  if (history.length === 0) {
    alert(`Nenhum histórico de rolls encontrado para ${resourceName}.`);
    return;
  }

  let historyText = `Histórico de Rolls - ${resourceName}:\n\n`;
  let total = 0;

  history.forEach((entry, index) => {
    historyText += `${entry.description}\n`;
    total = index === 0 ? entry.roll : total + entry.roll;
  });

  historyText += `\nTotal Base: ${total}`;

  alert(historyText);
}

// Function called when dice type changes
function onDiceTypeChange(resourceName) {
  updateResourceBaseValues(true);

  clearTimeout(window.saveTimeout);
  window.saveTimeout = setTimeout(() => {
    saveCharacterDataToStorage();
  }, 500);
}

// Single comprehensive function to handle all resource base calculations
function updateResourceBaseValues(diceTypeChanged = false) {
  const currentLevel =
    parseInt(document.getElementById("character-level")?.textContent) || 0;

  console.log(
    `Updating resource base values for level ${currentLevel}${diceTypeChanged ? " (dice type changed)" : ""}`
  );

  resourceSectionsConfig.forEach((config) => {
    const diceSelect = document.getElementById(config.diceSelectId);
    const baseInput = document.getElementById(config.baseId);

    if (!diceSelect || !baseInput) return;

    const diceType = diceSelect.value;
    const diceSides = parseInt(diceType.substring(1));

    let rollHistory = getResourceRollHistory(config.resourceName);

    if (diceTypeChanged && rollHistory.length > 0) {
      const existingDiceType = rollHistory[0]?.diceType;
      if (existingDiceType && existingDiceType !== diceType) {
        console.log(
          `Dice type changed from ${existingDiceType} to ${diceType} for ${config.resourceName}, clearing history`
        );
        rollHistory = [];
        localStorage.setItem(
          `${SAVE_PREFIX}${config.resourceName.toLowerCase()}_roll_history`,
          JSON.stringify(rollHistory)
        );
      }
    }

    const existingLevels = new Set(rollHistory.map((entry) => entry.level));

    if (!existingLevels.has(0)) {
      const maxValue = diceSides;
      rollHistory.unshift({
        level: 0,
        roll: maxValue,
        diceType: diceType,
        description: `Nível 0: Valor máximo do ${diceType}`,
      });
      existingLevels.add(0);
      console.log(
        `Auto-initialized ${config.resourceName} level 0 with ${maxValue}`
      );
    }

    const missingLevels = [];
    for (let level = 1; level <= currentLevel; level++) {
      if (!existingLevels.has(level)) {
        missingLevels.push(level);
      }
    }

    missingLevels.forEach((level) => {
      const roll = Math.floor(Math.random() * diceSides) + 1;
      rollHistory.push({
        level: level,
        roll: roll,
        diceType: diceType,
        description: `Nível ${level}: Rolou ${roll} no ${diceType} (automático)`,
      });
      console.log(
        `🎲 ${config.resourceName} (Nível ${level}): Rolou ${roll} no ${diceType}`
      );
    });

    rollHistory.sort((a, b) => a.level - b.level);

    let calculatedBase = 0;
    rollHistory.forEach((entry) => {
      if (entry.level <= currentLevel) {
        if (entry.level === 0) {
          calculatedBase = entry.roll;
        } else {
          calculatedBase += entry.roll;
        }
      }
    });

    baseInput.value = calculatedBase;
    console.log(
      `Updated ${config.resourceName} base to ${calculatedBase} (up to level ${currentLevel})`
    );

    if (missingLevels.length > 0) {
      saveResourceRollHistory(config.resourceName, rollHistory);
    }

    calculateResourceTotal(config.resourceName);
  });
}

// Level editing functions
function editLevel(element) {
  element.dataset.previousLevel = element.textContent;

  element.focus();
  if (window.getSelection && document.createRange) {
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

function saveLevel(element) {
  const previousLevel = parseInt(element.dataset.previousLevel) || 0;
  let level = parseInt(element.textContent) || 0;
  if (level < 0) level = 0;
  if (level > 24) level = 24;
  element.textContent = level;

  element.dataset.previousLevel = level;

  console.log(`Level changed from ${previousLevel} to ${level}`);

  updateMaxPointsOnLevelUp();
  updateDiceSelectorAvailability();
  updateResourceBaseValues(false);

  clearTimeout(window.saveTimeout);
  window.saveTimeout = setTimeout(() => {
    saveCharacterDataToStorage();
  }, 500);
}

function handleLevelKeypress(event, element) {
  if (event.key === "Enter") {
    element.blur();
    return false;
  }

  if (
    !/[\d]/.test(event.key) &&
    !["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(event.key)
  ) {
    event.preventDefault();
    return false;
  }
}

// Function to update available points when leveling up
function updateMaxPointsOnLevelUp() {
  calculateAvailablePoints();
}

// Function to calculate available points based on character level
function calculateAvailablePoints() {
  const level =
    parseInt(document.getElementById("character-level").textContent) || 0;

  const threeLevelBonus =
    level > 0
      ? Math.floor(level / 3) *
        levelProgressionConfig.attributePointsPerThreeLevels
      : 0;
  const availableAttributePoints =
    levelProgressionConfig.attributePointsBase + threeLevelBonus;

  let availableSkillPoints = 0;

  for (let i = 0; i <= level; i++) {
    if (i < levelProgressionConfig.skillPointsPerLevel.length) {
      availableSkillPoints += levelProgressionConfig.skillPointsPerLevel[i];
    }
  }

  document.getElementById("attribute-available").textContent =
    availableAttributePoints;
  document.getElementById("skill-available").textContent =
    availableSkillPoints;

  return {
    attributes: availableAttributePoints,
    skills: availableSkillPoints,
  };
}

// Event handler for section clicks
function handleSectionClick(sectionId) {
  console.log(`Section clicked: ${sectionId}`);

  const section = document.querySelector(`[data-section="${sectionId}"]`);
  if (section) {
    section.classList.toggle("highlighted");
  }

  switch (sectionId) {
    case "social":
      console.log("Social skills section clicked");
      break;
    case "cultura":
      console.log("Cultura skills section clicked");
      break;
    case "atletismo":
      console.log("Atletismo skills section clicked");
      break;
    case "manual":
      console.log("Manual skills section clicked");
      break;
    case "combate":
      console.log("Combate skills section clicked");
      break;
    case "sobrevivencia":
      console.log("Sobrevivência skills section clicked");
      break;
    case "sistema_faq":
      console.log("Sistema FAQ section clicked");
      break;
    case "magia":
      console.log("Magia section clicked");
      break;
    case "recursos":
      console.log("Recursos section clicked");
      break;
    default:
      console.log("Unknown section clicked");
  }
}

// Function to save character data to localStorage
function saveCharacterDataToStorage() {
  const data = saveCharacterData();
  try {
    localStorage.setItem(SAVE_PREFIX + "character_sheet", JSON.stringify(data));
    console.log("Character data saved to localStorage");
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

// Function to load character data from localStorage
function loadCharacterDataFromStorage() {
  try {
    const savedData = localStorage.getItem(SAVE_PREFIX + "character_sheet");
    if (savedData) {
      const data = JSON.parse(savedData);
      loadCharacterData(data);
      calculateTotalPoints();
      setTimeout(() => {
        updateSkillModifierFromFeiticaria();
      }, 100);
      console.log("Character data loaded from localStorage");
      return true;
    }
  } catch (error) {
    console.error("Error loading from localStorage:", error);
  }
  return false;
}

// Function to clear saved character data
function clearSavedCharacterData() {
  try {
    localStorage.removeItem(SAVE_PREFIX + "character_sheet");
    localStorage.removeItem(SAVE_PREFIX + "character_magics");
    resourceSectionsConfig.forEach((config) => {
      localStorage.removeItem(
        `${SAVE_PREFIX}${config.resourceName.toLowerCase()}_roll_history`
      );
    });

    if (magicManager) {
      magicManager.magics = [];
      magicManager.renderMagicList();
    }

    clearEssenceSelectionState();

    console.log("All saved character data cleared");
    alert("Todos os dados salvos foram removidos.");
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}

// Function to save character data to JSON
function saveCharacterData() {
  const data = {
    characterName: document.querySelector(
      'input[placeholder="Nome do personagem"]'
    ).value,
    description: document.querySelector(
      'textarea[placeholder="Descrição do personagem..."]'
    ).value,
    level:
      parseInt(document.getElementById("character-level").textContent) || 0,
    attributes: {
      con: document.querySelector('input[data-attribute="con"]')?.value || 0,
      soc: document.querySelector('input[data-attribute="soc"]')?.value || 0,
      mag: document.querySelector('input[data-attribute="mag"]')?.value || 0,
      alt: document.querySelector('input[data-attribute="alt"]')?.value || 0,
      man: document.querySelector('input[data-attribute="man"]')?.value || 0,
      com: document.querySelector('input[data-attribute="com"]')?.value || 0,
      sob: document.querySelector('input[data-attribute="sob"]')?.value || 0,
      cul: document.querySelector('input[data-attribute="cul"]')?.value || 0,
    },
    skills: {},
    hp: {
      base: document.getElementById("hp-base")?.value || 0,
      extra: document.getElementById("hp-extra")?.value || 0,
      total: document.getElementById("hp-total")?.value || 0,
      current: document.getElementById("hp-current")?.value || 0,
      diceType: document.getElementById("hp-dice-select")?.value || "d6",
      rollHistory: getResourceRollHistory("HP"),
    },
    mana: {
      base: document.getElementById("mana-base")?.value || 0,
      extra: document.getElementById("mana-extra")?.value || 0,
      total: document.getElementById("mana-total")?.value || 0,
      current: document.getElementById("mana-current")?.value || 0,
      diceType: document.getElementById("mana-dice-select")?.value || "d6",
      rollHistory: getResourceRollHistory("Mana"),
    },
  };

  // Collect skill levels (1, 2, 3) instead of just checked/unchecked
  document.querySelectorAll(".skill-levels").forEach((skillContainer) => {
    const skillName = skillContainer.dataset.skill;
    const levelCheckboxes = skillContainer.querySelectorAll(
      ".skill-level:checked"
    );

    let maxLevel = 0;
    levelCheckboxes.forEach((checkbox) => {
      const level = parseInt(checkbox.dataset.level);
      if (level > maxLevel) maxLevel = level;
    });

    data.skills[skillName] = maxLevel;
  });

  const resourcesTextarea = document.querySelector(
    '[data-section="recursos"] textarea'
  );
  if (resourcesTextarea) {
    data.resources = resourcesTextarea.value;
  }

  const inventoryTextarea = document.querySelector(
    '.resources-section:not([data-section="recursos"]) textarea'
  );
  if (inventoryTextarea) {
    data.inventory = inventoryTextarea.value;
  }

  const movementInput = document.getElementById("movement");
  if (movementInput) {
    data.movement = movementInput.value;
  }

  if (magicManager) {
    data.magics = magicManager.getMagicsData();
  }

  data.currentEssenceSelection = getCurrentEssenceSelectionState();

  return data;
}

// Function to load character data from JSON
function loadCharacterData(data) {
  if (data.characterName) {
    document.querySelector(
      'input[placeholder="Nome do personagem"]'
    ).value = data.characterName;
  }
  if (data.description) {
    document.querySelector(
      'textarea[placeholder="Descrição do personagem..."]'
    ).value = data.description;
  }

  if (data.level !== undefined) {
    const levelElement = document.getElementById("character-level");
    if (levelElement) {
      levelElement.textContent = data.level;
      levelElement.dataset.previousLevel = data.level;
    }
  }

  Object.keys(data.attributes || {}).forEach((attr) => {
    const input = document.querySelector(`input[data-attribute="${attr}"]`);
    if (input) input.value = data.attributes[attr];
  });

  Object.keys(data.skills || {}).forEach((skillName) => {
    const skillLevel = data.skills[skillName];
    const skillContainer = document.querySelector(
      `[data-skill="${skillName}"].skill-levels`
    );

    if (skillContainer && skillLevel > 0) {
      for (let level = 1; level <= skillLevel; level++) {
        const checkbox = skillContainer.querySelector(
          `input[data-level="${level}"]`
        );
        if (checkbox) checkbox.checked = true;
      }
    }
  });

  if (data.resources !== undefined) {
    const resourcesTextarea = document.querySelector(
      '[data-section="recursos"] textarea'
    );
    if (resourcesTextarea) {
      resourcesTextarea.value = data.resources;
    }
  }

  if (data.inventory !== undefined) {
    const inventoryTextarea = document.querySelector(
      '.resources-section:not([data-section="recursos"]) textarea'
    );
    if (inventoryTextarea) {
      inventoryTextarea.value = data.inventory;
    }
  }

  if (data.movement !== undefined) {
    const movementInput = document.getElementById("movement");
    if (movementInput) {
      movementInput.value = data.movement;
    }
  }

  if (data.hp) {
    if (data.hp.base !== undefined) {
      const hpBaseInput = document.getElementById("hp-base");
      if (hpBaseInput) hpBaseInput.value = data.hp.base;
    }
    if (data.hp.extra !== undefined) {
      const hpExtraInput = document.getElementById("hp-extra");
      if (hpExtraInput) hpExtraInput.value = data.hp.extra;
    }
    if (data.hp.total !== undefined) {
      const hpTotalInput = document.getElementById("hp-total");
      if (hpTotalInput) hpTotalInput.value = data.hp.total;
    }
    if (data.hp.current !== undefined) {
      const hpCurrentInput = document.getElementById("hp-current");
      if (hpCurrentInput) hpCurrentInput.value = data.hp.current;
    }
    if (data.hp.diceType !== undefined) {
      const hpDiceSelect = document.getElementById("hp-dice-select");
      if (hpDiceSelect) hpDiceSelect.value = data.hp.diceType;
    }
    if (data.hp.rollHistory !== undefined) {
      saveResourceRollHistory("HP", data.hp.rollHistory);
    }
  }

  if (data.mana) {
    if (data.mana.base !== undefined) {
      const manaBaseInput = document.getElementById("mana-base");
      if (manaBaseInput) manaBaseInput.value = data.mana.base;
    }
    if (data.mana.extra !== undefined) {
      const manaExtraInput = document.getElementById("mana-extra");
      if (manaExtraInput) manaExtraInput.value = data.mana.extra;
    }
    if (data.mana.total !== undefined) {
      const manaTotalInput = document.getElementById("mana-total");
      if (manaTotalInput) manaTotalInput.value = data.mana.total;
    }
    if (data.mana.current !== undefined) {
      const manaCurrentInput = document.getElementById("mana-current");
      if (manaCurrentInput) manaCurrentInput.value = data.mana.current;
    }
    if (data.mana.diceType !== undefined) {
      const manaDiceSelect = document.getElementById("mana-dice-select");
      if (manaDiceSelect) manaDiceSelect.value = data.mana.diceType;
    }
    if (data.mana.rollHistory !== undefined) {
      saveResourceRollHistory("Mana", data.mana.rollHistory);
    }
  }

  skillSectionsConfig.forEach((config) => {
    if (config.attribute) {
      const attributeInput = document.querySelector(
        `input[data-attribute="${config.attribute.dataAttribute}"]`
      );
      const attributeValue = attributeInput
        ? parseInt(attributeInput.value) || 0
        : 0;
      updateSkillAvailability(config.sectionId, attributeValue);
    }
  });

  calculateAvailablePoints();
  validateAttributeAndSkills();
  calculateTotalPoints();

  resourceSectionsConfig.forEach((config) => {
    calculateResourceTotal(config.resourceName);
  });

  if (data.magics && magicManager) {
    magicManager.loadMagicsData(data.magics);
  }

  if (data.currentEssenceSelection) {
    loadEssenceSelectionState(data.currentEssenceSelection);
  }

  updateDiceSelectorAvailability();
}

function setupAutoSave() {
  document.addEventListener("input", function (e) {
    clearTimeout(window.saveTimeout);
    window.saveTimeout = setTimeout(() => {
      saveCharacterDataToStorage();
    }, 500);
  });

  document.addEventListener("change", function (e) {
    if (e.target.type === "checkbox") {
      clearTimeout(window.saveTimeout);
      window.saveTimeout = setTimeout(() => {
        saveCharacterDataToStorage();
      }, 500);
    }
  });
}

// Validation function for attribute changes
function validateAttributeAndSkills(attributeName, sectionId) {
  if (!attributeName) return;

  const attributeInput = document.querySelector(
    `input[data-attribute="${attributeName}"]`
  );
  if (!attributeInput) return;

  let value = parseInt(attributeInput.value);
  if (isNaN(value) || value < 0) {
    value = 0;
    attributeInput.value = 0;
  } else if (value > 3) {
    value = 3;
    attributeInput.value = 3;
  }

  updateSkillAvailability(sectionId, value);
  calculateTotalPoints();
}

// Function to toggle skill levels (1, 2, 3)
function toggleSkillLevel(checkbox, level) {
  const sectionId = checkbox.dataset.section;
  const skillName = checkbox.dataset.skill;

  if (!sectionId) return;

  const config = skillSectionsConfig.find((c) => c.sectionId === sectionId);
  if (!config || !config.attribute) return;

  const attributeInput = document.querySelector(
    `input[data-attribute="${config.attribute.dataAttribute}"]`
  );
  if (!attributeInput) return;

  const attributeValue = parseInt(attributeInput.value) || 0;

  if (level > attributeValue) {
    checkbox.checked = false;
    alert(
      `Você precisa ter pelo menos ${level} pontos em ${config.attribute.label} para selecionar o nível ${level} de ${skillName}`
    );
    return false;
  }

  const skillContainer = checkbox.closest(".skill-levels");
  const levelCheckboxes = skillContainer.querySelectorAll(".skill-level");

  if (checkbox.checked) {
    levelCheckboxes.forEach((cb) => {
      const cbLevel = parseInt(cb.dataset.level);
      if (cbLevel <= level) {
        cb.checked = true;
      }
    });
  } else {
    levelCheckboxes.forEach((cb) => {
      const cbLevel = parseInt(cb.dataset.level);
      if (cbLevel >= level) {
        cb.checked = false;
      }
    });
  }

  calculateTotalPoints();

  if (skillName === "Feitiçaria") {
    updateSkillModifierFromFeiticaria();
  }

  return true;
}

// Function to get Feitiçaria skill level
function getFeiticariaLevel() {
  const feiticariaContainer = document.querySelector(
    '[data-skill="Feitiçaria"][data-section="magia"]'
  );

  if (!feiticariaContainer) return 0;

  const levelCheckboxes = feiticariaContainer.querySelectorAll('.skill-level:checked');
  let maxLevel = 0;

  levelCheckboxes.forEach((checkbox) => {
    const level = parseInt(checkbox.dataset.level) || 0;
    if (level > maxLevel) maxLevel = level;
  });

  return maxLevel;
}

// Function to update skill modifier based on Feitiçaria level
function updateSkillModifierFromFeiticaria() {
  const feiticariaLevel = getFeiticariaLevel();
  const skillModifierInput = document.getElementById("magic-skill-modifier-input");

  if (!skillModifierInput) return;

  let modifier = 1.0;
  if (feiticariaLevel === 1) {
    modifier = 0.95;
  } else if (feiticariaLevel === 2) {
    modifier = 0.9;
  } else if (feiticariaLevel === 3) {
    modifier = 0.85;
  }

  skillModifierInput.value = modifier.toFixed(2);
  updateFinalCostDisplay();
}

// Function to toggle Prestigio skills (costs 1 attribute point each)
function togglePrestigioSkill(checkbox) {
  calculateTotalPoints();
  return true;
}

// Function to update skill availability based on attribute value
function updateSkillAvailability(sectionId, attributeValue) {
  const sectionElement = document.querySelector(
    `[data-section="${sectionId}"]`
  );
  if (!sectionElement) return;

  const skillContainers = sectionElement.querySelectorAll(".skill-levels");

  skillContainers.forEach((container) => {
    const levelCheckboxes = container.querySelectorAll(".skill-level");

    levelCheckboxes.forEach((checkbox) => {
      const level = parseInt(checkbox.dataset.level);

      if (level > attributeValue) {
        checkbox.disabled = true;
        checkbox.checked = false;
      } else if (attributeValue >= 1) {
        checkbox.disabled = false;
      } else {
        checkbox.disabled = true;
        checkbox.checked = false;
      }
    });

    console.log("attributeValue:", attributeValue);
    if (attributeValue === 0) {
      container.classList.add("disabled");
    } else {
      container.classList.remove("disabled");
    }
  });
}

// Function to calculate skill level cost
function calculateSkillCost(level) {
  switch (level) {
    case 1:
      return 1;
    case 2:
      return 1 + 1;
    case 3:
      return 1 + 1 + 1;
    default:
      return 0;
  }
}

// Function to calculate total points
function calculateTotalPoints() {
  let attributePoints = 0;
  let skillPoints = 0;
  let prestigioPoints = 0;

  document.querySelectorAll("input[data-attribute]").forEach((input) => {
    const value = parseInt(input.value) || 0;
    attributePoints += value;
  });

  document.querySelectorAll(".skill-levels").forEach((skillContainer) => {
    const sectionId = skillContainer.dataset.section;

    if (sectionId === "recursos") return;

    const levelCheckboxes = skillContainer.querySelectorAll(
      ".skill-level:checked"
    );

    let maxLevel = 0;
    levelCheckboxes.forEach((checkbox) => {
      const level = parseInt(checkbox.dataset.level);
      if (level > maxLevel) maxLevel = level;
    });

    skillPoints += calculateSkillCost(maxLevel);
  });

  document.querySelectorAll(".prestigio-level:checked").forEach(() => {
    prestigioPoints += 1;
  });

  const availableAttributePoints =
    parseInt(document.getElementById("attribute-available").textContent) || 5;
  const availableSkillPoints =
    parseInt(document.getElementById("skill-available").textContent) || 10;

  document.getElementById("attribute-points").textContent = attributePoints;
  document.getElementById("skill-points").textContent = skillPoints;
  document.getElementById("prestigio-points").textContent = prestigioPoints;

  document.getElementById("attribute-used").textContent =
    attributePoints + prestigioPoints;
  document.getElementById("skill-used").textContent = skillPoints;
  document.getElementById("prestigio-used").textContent = prestigioPoints;

  checkAndApplyWarningColors(
    attributePoints + prestigioPoints,
    skillPoints,
    availableAttributePoints,
    availableSkillPoints
  );

  return {
    attributes: attributePoints,
    skills: skillPoints,
    prestigio: prestigioPoints,
  };
}

// Function to check and apply warning colors when points are exceeded
function checkAndApplyWarningColors(
  usedAttributePoints,
  usedSkillPoints,
  availableAttributePoints,
  availableSkillPoints
) {
  const attributeExceeded = usedAttributePoints > availableAttributePoints;
  const skillExceeded = usedSkillPoints > availableSkillPoints;

  const attributeCategory = document
    .querySelector("#attribute-points")
    .closest(".point-category");
  const skillCategory = document
    .querySelector("#skill-points")
    .closest(".point-category");

  if (attributeExceeded) {
    attributeCategory.classList.add("points-exceeded");
  } else {
    attributeCategory.classList.remove("points-exceeded");
  }

  if (skillExceeded) {
    skillCategory.classList.add("points-exceeded");
  } else {
    skillCategory.classList.remove("points-exceeded");
  }

  document.querySelectorAll("input[data-attribute]").forEach((input) => {
    if (attributeExceeded) {
      input.classList.add("attribute-exceeded");
    } else {
      input.classList.remove("attribute-exceeded");
    }
  });

  document.querySelectorAll(".skill-levels").forEach((skillContainer) => {
    const sectionId = skillContainer.dataset.section;

    if (sectionId === "recursos") return;

    if (skillExceeded) {
      skillContainer.classList.add("skill-exceeded");
    } else {
      skillContainer.classList.remove("skill-exceeded");
    }
  });
}
