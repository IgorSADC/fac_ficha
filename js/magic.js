// Magic system classes, MagicManager, and all magic UI functions
// Note: essencesConfig, hemisphereProximity, defaultComponentFieldsConfig are in config/magic-config.js

// MagicComponentField class to represent different component field types
class MagicComponentField {
  constructor(id, title, description, options = [], required = false) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.options = options; // Array of {id, name, costModifier}
    this.required = required;
  }

  // Create MagicComponentField from JSON
  static fromJSON(data) {
    return new MagicComponentField(
      data.id,
      data.title,
      data.description,
      data.options || [],
      data.required || false
    );
  }

  // Convert to JSON for storage
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      options: this.options,
      required: this.required,
    };
  }
}

// Magic class to represent individual spells
class Magic {
  constructor(
    name,
    componentSelections = {},
    essenceQuantities = {},
    baseCost = null,
    dice = null,
    skillModifier = 1.0
  ) {
    this.id = Date.now() + Math.random(); // Simple unique ID
    this.name = name;
    this.componentSelections = componentSelections; // Object with fieldId: optionId
    this.essenceQuantities = essenceQuantities; // Object with essenceId: quantity
    this.baseCost = baseCost || this.calculateBaseCostFromEssences();
    this.dice = dice || this.getFinalDice(); // Final dice string
    this.skillModifier = skillModifier; // Skill modifier for final cost
    this.createdAt = new Date();
  }

  // Calculate base cost from selected essences with hemisphere proximity modifiers
  calculateBaseCostFromEssences() {
    if (
      !this.essenceQuantities ||
      Object.keys(this.essenceQuantities).length === 0
    ) {
      return 1;
    }

    let totalCost = 0;

    // Calculate base cost from essence quantities
    Object.keys(this.essenceQuantities).forEach((essenceId) => {
      const quantity = this.essenceQuantities[essenceId];
      if (quantity > 0) {
        for (let hemisphere of essencesConfig) {
          const essence = hemisphere.essences.find((e) => e.id === essenceId);
          if (essence) {
            totalCost += essence.cost * quantity;
            break;
          }
        }
      }
    });

    // Apply hemisphere proximity modifiers
    const selectedEssenceIds = Object.keys(this.essenceQuantities).filter(
      (id) => this.essenceQuantities[id] > 0
    );
    const proximityResult =
      calculateHemisphereProximityModifier(selectedEssenceIds);
    totalCost *= proximityResult.modifier;

    return Math.max(Math.ceil(totalCost), 1); // Minimum cost of 1
  }

  // Calculate final cost based on component selections
  getFinalCost(componentFields) {
    let totalModifier = 1.0;

    // Apply modifiers from each field selection
    Object.keys(this.componentSelections).forEach((fieldId) => {
      const optionId = this.componentSelections[fieldId];
      if (!optionId) return;

      const field = componentFields.find((f) => f.id === fieldId);
      if (!field) return;

      const option = field.options.find((o) => o.id === optionId);
      if (option && option.costModifier) {
        totalModifier *= option.costModifier;
      }
    });

    // Apply skill modifier
    const finalModifier = totalModifier * (this.skillModifier || 1.0);

    return Math.ceil(this.baseCost * finalModifier);
  }

  // Calculate final dice from selected essences
  getFinalDice() {
    if (
      !this.essenceQuantities ||
      Object.keys(this.essenceQuantities).length === 0
    ) {
      return "0";
    }

    const diceMap = {};

    // Collect all dice from essence quantities
    Object.keys(this.essenceQuantities).forEach((essenceId) => {
      const quantity = this.essenceQuantities[essenceId];
      if (quantity > 0) {
        for (let hemisphere of essencesConfig) {
          const essence = hemisphere.essences.find((e) => e.id === essenceId);
          if (essence && essence.dice) {
            // Parse dice (e.g., "1d4" -> {count: 1, sides: 4})
            const diceMatch = essence.dice.match(/(\d+)d(\d+)/);
            if (diceMatch) {
              const count = parseInt(diceMatch[1]) * quantity; // Multiply by quantity
              const sides = parseInt(diceMatch[2]);
              const diceType = `d${sides}`;

              if (diceMap[diceType]) {
                diceMap[diceType] += count;
              } else {
                diceMap[diceType] = count;
              }
            }
            break;
          }
        }
      }
    });

    // Format final dice string
    const diceStrings = Object.keys(diceMap)
      .sort((a, b) => {
        const aSize = parseInt(a.substring(1));
        const bSize = parseInt(b.substring(1));
        return bSize - aSize; // Sort descending by dice size
      })
      .map((diceType) => `${diceMap[diceType]}${diceType}`);

    return diceStrings.length > 0 ? diceStrings.join(" + ") : "0";
  }

  // Get final dice as display string
  getFinalDiceDisplay(finalDice) {
    return finalDice === "0" ? "Nenhum dado" : finalDice;
  }

  // Get selected essences as display string
  getEssencesDisplay() {
    if (
      !this.essenceQuantities ||
      Object.keys(this.essenceQuantities).length === 0
    ) {
      return "Nenhuma essência";
    }

    const essenceNames = [];
    Object.keys(this.essenceQuantities).forEach((essenceId) => {
      const quantity = this.essenceQuantities[essenceId];
      if (quantity > 0) {
        for (let hemisphere of essencesConfig) {
          const essence = hemisphere.essences.find((e) => e.id === essenceId);
          if (essence) {
            const displayName =
              quantity > 1 ? `${essence.name} (x${quantity})` : essence.name;
            essenceNames.push(displayName);
            break;
          }
        }
      }
    });

    return essenceNames.length > 0
      ? essenceNames.join(", ")
      : "Nenhuma essência";
  }

  // Get hemisphere proximity modifier details
  getHemisphereProximityDetails() {
    if (
      !this.essenceQuantities ||
      Object.keys(this.essenceQuantities).length <= 1
    ) {
      return { modifier: 1.0, description: "" };
    }

    let rawCost = 0;

    // Calculate raw cost from essence quantities
    Object.keys(this.essenceQuantities).forEach((essenceId) => {
      const quantity = this.essenceQuantities[essenceId];
      if (quantity > 0) {
        for (let hemisphere of essencesConfig) {
          const essence = hemisphere.essences.find((e) => e.id === essenceId);
          if (essence) {
            rawCost += essence.cost * quantity;
            break;
          }
        }
      }
    });

    const selectedEssenceIds = Object.keys(this.essenceQuantities).filter(
      (id) => this.essenceQuantities[id] > 0
    );
    const proximityResult =
      calculateHemisphereProximityModifier(selectedEssenceIds);

    // Format description from details
    const description = proximityResult.details
      .map(
        (detail) =>
          `${detail.pair}: ${detail.relationship} (×${detail.modifier})`
      )
      .join(", ");

    return {
      modifier: proximityResult.modifier,
      description: description,
      rawCost: rawCost,
      finalCost: Math.ceil(rawCost * proximityResult.modifier),
    };
  }

  // Get component selections as display string
  getComponentSelectionsDisplay(componentFields) {
    const selections = [];

    Object.keys(this.componentSelections).forEach((fieldId) => {
      const optionId = this.componentSelections[fieldId];
      if (!optionId) return;

      const field = componentFields.find((f) => f.id === fieldId);
      if (!field) return;

      const option = field.options.find((o) => o.id === optionId);
      if (option) {
        selections.push(`${field.title}: ${option.name}`);
      }
    });

    return selections.length > 0 ? selections.join(" | ") : "Nenhum";
  }

  // Convert to JSON for storage
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      componentSelections: this.componentSelections,
      essenceQuantities: this.essenceQuantities,
      baseCost: this.baseCost,
      dice: this.dice,
      createdAt: this.createdAt.toISOString(),
    };
  }

  // Create Magic from JSON data
  static fromJSON(data) {
    const magic = new Magic(
      data.name,
      data.componentSelections || {},
      data.essenceQuantities || data.selectedEssences || {}, // Support old format
      data.baseCost || 1,
      data.dice || null
    );
    magic.id = data.id;
    magic.createdAt = new Date(data.createdAt);
    return magic;
  }
}

// Helper function to calculate hemisphere proximity modifier
function calculateHemisphereProximityModifier(selectedEssences) {
  if (!selectedEssences || selectedEssences.length === 0) {
    return { modifier: 1.0, details: [] };
  }

  const selectedHemispheres = new Set();

  // Collect hemispheres from selected essences
  selectedEssences.forEach((essenceId) => {
    for (let hemisphere of essencesConfig) {
      const essence = hemisphere.essences.find((e) => e.id === essenceId);
      if (essence) {
        selectedHemispheres.add(hemisphere.id);
        break;
      }
    }
  });

  if (selectedHemispheres.size <= 1) {
    return { modifier: 1.0, details: [] };
  }

  const hemisphereArray = Array.from(selectedHemispheres);
  let proximityModifier = 1.0;
  const proximityDetails = [];

  // Check proximity between consecutive hemispheres only
  for (let i = 1; i < hemisphereArray.length; i++) {
    const hemisphere1 = hemisphereArray[i - 1];
    const hemisphere2 = hemisphereArray[i];

    const proximity1 = hemisphereProximity[hemisphere1];
    let pairModifier = 1.2; // Default: far modifier
    let relationship = "distante";

    if (proximity1) {
      if (proximity1.close && proximity1.close.includes(hemisphere2)) {
        pairModifier = 1.1; // Close modifier
        relationship = "próximo";
      }
    }

    proximityModifier *= pairModifier;
    proximityDetails.push({
      pair: `${hemisphere1}+${hemisphere2}`,
      relationship,
      modifier: pairModifier,
    });
  }

  return {
    modifier: proximityModifier,
    details: proximityDetails,
  };
}

// Magic Component class to handle magic list management and rendering
class MagicManager {
  constructor() {
    this.magics = [];
    this.componentFields = [];
    this.essencesConfig = essencesConfig;
    this.initializeDefaultComponentFields();
    this.loadMagicsFromStorage();
  }

  // Initialize default component fields from config
  initializeDefaultComponentFields() {
    this.componentFields = defaultComponentFieldsConfig.map((config) =>
      MagicComponentField.fromJSON(config)
    );
  }

  // Add a new magic to the list
  addMagic(name, componentSelections, baseCost = 1) {
    if (!name || !name.trim()) {
      alert("Por favor, digite um nome para a magia.");
      return false;
    }

    // Check if any required fields are missing
    const missingRequired = this.componentFields
      .filter((field) => field.required && !componentSelections[field.id])
      .map((field) => field.title);

    if (missingRequired.length > 0) {
      alert(`Por favor, selecione: ${missingRequired.join(", ")}`);
      return false;
    }

    // Check if magic with same name already exists
    const existingMagic = this.magics.find(
      (magic) => magic.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (existingMagic) {
      alert(`A magia "${name.trim()}" já existe na lista.`);
      return false;
    }

    const magic = new Magic(name.trim(), componentSelections, baseCost);
    this.magics.push(magic);
    this.saveMagicsToStorage();
    this.renderMagicList();
    return true;
  }

  // Add a new magic with essences to the list
  addMagicWithEssences(
    name,
    componentSelections,
    essenceQuantities,
    baseCost = 1,
    dice = null,
    skillModifier = 1.0
  ) {
    if (!name || !name.trim()) {
      alert("Por favor, digite um nome para a magia.");
      return false;
    }

    // Check if any required fields are missing
    const missingRequired = this.componentFields
      .filter((field) => field.required && !componentSelections[field.id])
      .map((field) => field.title);

    if (missingRequired.length > 0) {
      alert(`Por favor, selecione: ${missingRequired.join(", ")}`);
      return false;
    }

    // Check if magic with same name already exists
    const existingMagic = this.magics.find(
      (magic) => magic.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (existingMagic) {
      alert(`A magia "${name.trim()}" já existe na lista.`);
      return false;
    }

    const magic = new Magic(
      name.trim(),
      componentSelections,
      essenceQuantities,
      baseCost,
      dice,
      skillModifier
    );
    this.magics.push(magic);
    this.saveMagicsToStorage();
    this.renderMagicList();
    return true;
  }

  // Remove a magic from the list
  removeMagic(magicId) {
    const index = this.magics.findIndex((magic) => magic.id === magicId);
    if (index !== -1) {
      const magic = this.magics[index];
      if (confirm(`Tem certeza que deseja remover a magia "${magic.name}"?`)) {
        this.magics.splice(index, 1);
        this.saveMagicsToStorage();
        this.renderMagicList();
        return true;
      }
    }
    return false;
  }

  // Render component field selects
  renderComponentOptions() {
    const container = document.getElementById("magic-components-container");
    if (!container) return;

    container.innerHTML = "";

    this.componentFields.forEach((field) => {
      const fieldDiv = document.createElement("div");
      fieldDiv.className = "mb-3";

      const selectId = `magic-field-${field.id}`;
      const requiredLabel = field.required ? " *" : "";

      fieldDiv.innerHTML = `
        <label for="${selectId}" class="form-label">
          <strong>${field.title}${requiredLabel}</strong>
        </label>
        <select class="form-control magic-component-select"
                id="${selectId}"
                data-field-id="${field.id}"
                title="${field.description}"
                onchange="updateFinalCostDisplay()">
          ${field.required
          ? ""
          : '<option value="">-- Selecione ' + field.title + " --</option>"
        }
          ${field.options
          .map(
            (option, index) =>
              `<option value="${option.id}" title="Custo: ×${option.costModifier}" ${field.required && index === 0 ? "selected" : ""}>
                ${option.name} (×${option.costModifier})
               </option>`
          )
          .join("")}
        </select>
        ${field.description
          ? `<small class="form-text text-muted">${field.description}</small>`
          : ""
        }
      `;

      container.appendChild(fieldDiv);
    });
  }

  // Render essences selection interface
  renderEssencesSelection() {
    const container = document.getElementById("magic-essences-container");
    if (!container) return;

    container.innerHTML = "";

    const headerDiv = document.createElement("div");
    headerDiv.className = "mb-3";
    headerDiv.innerHTML = `
      <h6 class="mb-2">🔮 Seleção de Essências</h6>
      <small class="text-muted">Selecione as essências para calcular o custo base da magia.</small>
      <div class="mt-2">
        <span id="calculated-base-cost" class="badge bg-info">Custo Base: 1</span>
        <span id="calculated-final-cost" class="badge bg-success ms-2">Custo Final: 1</span>
        <span id="calculated-final-dice" class="badge bg-warning ms-2">Dados: Nenhum dado</span>
      </div>
    `;
    container.appendChild(headerDiv);

    this.essencesConfig.forEach((hemisphere) => {
      const hemisphereDiv = document.createElement("div");
      hemisphereDiv.className = "mb-3 p-2 border rounded";
      hemisphereDiv.innerHTML = `
        <h6 class="mb-2 text-primary">${hemisphere.name}</h6>
        <div class="essence-checkboxes" data-hemisphere="${hemisphere.id}">
          ${hemisphere.essences
          .map(
            (essence) => `
            <div class="form-check form-check-inline essence-quantity-container d-flex align-items-center">
              <div class="d-flex align-items-center">
                <label class="form-check-label essence-label me-2" for="essence-${essence.id}">
                  ${essence.name} (${essence.cost})${essence.info
                ? `<button class="essence-info-btn"
                               onclick="showInfo('${essence.id}', '${essence.name}', \`${essence.info}\`)"
                               title="Ver informações sobre ${essence.name}">ℹ</button>`
                : ""
              }
                </label>
                <input class="form-check-input essence-checkbox me-2"
                       type="checkbox"
                       id="essence-checkbox-${essence.id}"
                       data-essence-id="${essence.id}"
                       onchange="toggleEssenceQuantity('${essence.id}')"
                       title="Habilitar seleção de ${essence.name}">
                <input class="form-control essence-quantity"
                       type="number"
                       id="essence-${essence.id}"
                       value="0"
                       min="0"
                       max="10"
                       data-essence-id="${essence.id}"
                       onchange="updateBaseCostFromEssences(); updateFinalDiceDisplay()"
                       title="Quantidade de ${essence.name} (custo: ${essence.cost} cada)"
                       disabled>
              </div>
            </div>
          `
          )
          .join("")}
        </div>
      `;
      container.appendChild(hemisphereDiv);
    });
  }

  // Render the complete magic list
  renderMagicList() {
    const container = document.getElementById("magic-list-container");
    const countElement = document.getElementById("magic-count");
    const noMagicMessage = document.getElementById("no-magic-message");

    if (!container) return;

    if (countElement) {
      countElement.textContent = this.magics.length;
    }

    container.innerHTML = "";

    if (this.magics.length === 0) {
      if (noMagicMessage) {
        container.appendChild(noMagicMessage);
      } else {
        container.innerHTML =
          '<p class="text-muted text-center">Nenhuma magia adicionada ainda.</p>';
      }
      return;
    }

    if (noMagicMessage) {
      noMagicMessage.style.display = "none";
    }

    this.magics.forEach((magic) => {
      const magicElement = this.renderMagicItem(magic);
      container.appendChild(magicElement);
    });

    this.updateTotalCostDisplay();
  }

  // Render individual magic item
  renderMagicItem(magic) {
    const magicDiv = document.createElement("div");
    magicDiv.className = "magic-item";
    magicDiv.dataset.magicId = magic.id;

    const finalCost = magic.getFinalCost(this.componentFields);
    const componentDisplay = magic.getComponentSelectionsDisplay(
      this.componentFields
    );
    const essencesDisplay = magic.getEssencesDisplay();
    const proximityDetails = magic.getHemisphereProximityDetails();
    const finalDice = magic.getFinalDice();
    const diceDisplay = magic.dice || magic.getFinalDiceDisplay(finalDice);
    const hasDice =
      diceDisplay && diceDisplay !== "Nenhum dado" && diceDisplay !== "0";

    let proximityInfo = "";
    if (proximityDetails.modifier > 1.0) {
      proximityInfo = `
        <div class="magic-proximity">
          <small class="text-info">Modificador Hemisférios: ×${proximityDetails.modifier.toFixed(2)}</small>
        </div>
      `;
    }

    let rollButton = "";
    if (hasDice) {
      rollButton = `
        <button class="magic-roll-btn btn btn-sm btn-outline-primary"
                onclick="rollMagicDice(${magic.id})"
                title="Rolar dados da magia">
          🎲 Rolar
        </button>
      `;
    }

    magicDiv.innerHTML = `
      <button class="magic-remove-btn" onclick="magicManager.removeMagic(${magic.id})" title="Remover magia">
        ✕
      </button>
      <div class="magic-name">${this.escapeHtml(magic.name)}</div>
      <div class="magic-details">
        <div class="magic-essences">
          <small class="text-muted">Essências:</small> ${this.escapeHtml(essencesDisplay)}
        </div>
        ${proximityInfo}
        <div class="magic-components">
          <small class="text-muted">Componentes:</small> ${this.escapeHtml(componentDisplay)}
        </div>
        <div class="magic-cost-breakdown">
          <span class="magic-base-cost">Base: ${magic.baseCost}</span>
          <span class="magic-final-cost">Final: ${finalCost}</span>
          <span class="magic-dice">Dados: ${this.escapeHtml(diceDisplay)}</span>
          ${rollButton}
        </div>
      </div>
    `;

    return magicDiv;
  }

  // Update total cost display
  updateTotalCostDisplay() {
    const totalCost = this.magics.reduce(
      (sum, magic) => sum + magic.getFinalCost(this.componentFields),
      0
    );

    const totalCostElement = document.getElementById("magic-total-cost");
    if (totalCostElement) {
      totalCostElement.textContent = totalCost;
    }
  }

  // Utility function to escape HTML
  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // Save magics to localStorage
  saveMagicsToStorage() {
    try {
      const data = this.magics.map((magic) => magic.toJSON());
      localStorage.setItem(
        SAVE_PREFIX + "character_magics",
        JSON.stringify(data)
      );
      console.log("Magics saved to localStorage");
    } catch (error) {
      console.error("Error saving magics to localStorage:", error);
    }
  }

  // Load magics from localStorage
  loadMagicsFromStorage() {
    try {
      const data = localStorage.getItem(SAVE_PREFIX + "character_magics");
      if (data) {
        const magicsData = JSON.parse(data);
        this.magics = magicsData.map((magicData) =>
          Magic.fromJSON(magicData)
        );
        console.log("Magics loaded from localStorage");
      }
    } catch (error) {
      console.error("Error loading magics from localStorage:", error);
      this.magics = [];
    }
  }

  // Clear all magics
  clearAllMagics() {
    if (this.magics.length === 0) {
      alert("Não há magias para remover.");
      return;
    }

    if (
      confirm(
        "Tem certeza que deseja remover todas as magias? Esta ação não pode ser desfeita."
      )
    ) {
      this.magics = [];
      this.saveMagicsToStorage();
      this.renderMagicList();
    }
  }

  // Get magics data for character save
  getMagicsData() {
    return this.magics.map((magic) => magic.toJSON());
  }

  // Load magics data from character load
  loadMagicsData(magicsData) {
    if (Array.isArray(magicsData)) {
      this.magics = magicsData.map((magicData) => Magic.fromJSON(magicData));
      this.renderMagicList();
    }
  }
}

// Global magic manager instance (initialized in main.js DOMContentLoaded)
let magicManager;

// Function to toggle essence quantity input based on checkbox state
function toggleEssenceQuantity(essenceId) {
  const checkbox = document.getElementById(`essence-checkbox-${essenceId}`);
  const quantityInput = document.getElementById(`essence-${essenceId}`);

  if (!checkbox || !quantityInput) return;

  if (checkbox.checked) {
    quantityInput.disabled = false;
    quantityInput.value = Math.max(parseInt(quantityInput.value) || 1, 1);
  } else {
    quantityInput.disabled = true;
    quantityInput.value = 0;
  }

  updateBaseCostFromEssences();
  updateFinalDiceDisplay();

  clearTimeout(window.saveTimeout);
  window.saveTimeout = setTimeout(() => {
    saveCharacterDataToStorage();
  }, 500);
}

// Function to get current essence selection state
function getCurrentEssenceSelectionState() {
  const essenceSelection = {
    checkboxStates: {},
    quantityValues: {},
  };

  const essenceQuantityInputs = document.querySelectorAll(".essence-quantity");
  essenceQuantityInputs.forEach((input) => {
    const essenceId = input.dataset.essenceId;
    const checkbox = document.getElementById(`essence-checkbox-${essenceId}`);

    if (checkbox) {
      essenceSelection.checkboxStates[essenceId] = checkbox.checked;
      essenceSelection.quantityValues[essenceId] =
        parseInt(input.value) || 0;
    }
  });

  return essenceSelection;
}

// Function to load essence selection state
function loadEssenceSelectionState(essenceSelection) {
  if (!essenceSelection) {
    updateBaseCostFromEssences();
    updateFinalDiceDisplay();
    return;
  }

  Object.keys(essenceSelection.checkboxStates || {}).forEach((essenceId) => {
    const checkbox = document.getElementById(`essence-checkbox-${essenceId}`);
    const quantityInput = document.getElementById(`essence-${essenceId}`);

    if (checkbox && quantityInput) {
      const isChecked = essenceSelection.checkboxStates[essenceId];
      const quantity = essenceSelection.quantityValues[essenceId] || 0;

      checkbox.checked = isChecked;
      quantityInput.value = quantity;
      quantityInput.disabled = !isChecked;
    }
  });

  updateBaseCostFromEssences();
  updateFinalDiceDisplay();
}

// Function to clear essence selection state
function clearEssenceSelectionState() {
  const essenceQuantityInputs = document.querySelectorAll(".essence-quantity");
  essenceQuantityInputs.forEach((input) => {
    const essenceId = input.dataset.essenceId;
    const checkbox = document.getElementById(`essence-checkbox-${essenceId}`);

    if (checkbox) {
      checkbox.checked = false;
      input.value = 0;
      input.disabled = true;
    }
  });

  updateBaseCostFromEssences();
  updateFinalDiceDisplay();
}

// Function to update base cost based on selected essence quantities
function updateBaseCostFromEssences() {
  const essenceQuantityInputs = document.querySelectorAll(".essence-quantity");
  let totalCost = 0;
  const essenceQuantities = {};

  essenceQuantityInputs.forEach((input) => {
    const essenceId = input.dataset.essenceId;
    const checkbox = document.getElementById(`essence-checkbox-${essenceId}`);
    const quantity = parseInt(input.value) || 0;

    if (checkbox && checkbox.checked && quantity > 0) {
      essenceQuantities[essenceId] = quantity;

      for (let hemisphere of essencesConfig) {
        const essence = hemisphere.essences.find((e) => e.id === essenceId);
        if (essence) {
          totalCost += essence.cost * quantity;
          break;
        }
      }
    }
  });

  const selectedEssenceIds = Object.keys(essenceQuantities);
  const proximityResult =
    calculateHemisphereProximityModifier(selectedEssenceIds);
  totalCost *= proximityResult.modifier;

  const baseCost = totalCost;
  const costInput = document.getElementById("magic-cost-input");
  const costDisplay = document.getElementById("calculated-base-cost");

  if (costInput) {
    costInput.value = Number(baseCost).toFixed(2);
  }

  if (costDisplay) {
    let displayText = `Custo Base: ${Number(baseCost).toFixed(2)}`;
    if (proximityResult.details.length > 0) {
      displayText += ` (×${proximityResult.modifier.toFixed(2)} por hemisférios diferentes)`;
    }
    costDisplay.textContent = displayText;
  }

  updateFinalCostDisplay();
}

// Function to calculate and update final cost display
function updateFinalCostDisplay() {
  const costInput = document.getElementById("magic-cost-input");
  const baseCost = costInput ? parseInt(costInput.value) || 1 : 1;

  const skillModifierInput = document.getElementById(
    "magic-skill-modifier-input"
  );
  const skillModifier = skillModifierInput
    ? parseFloat(skillModifierInput.value) || 1.0
    : 1.0;

  const componentSelects = document.querySelectorAll(".magic-component-select");

  let totalModifier = 1.0;

  componentSelects.forEach((select) => {
    const fieldId = select.dataset.fieldId;
    const optionId = select.value;

    if (!optionId) return;

    const field = magicManager.componentFields.find((f) => f.id === fieldId);
    if (!field) return;

    const option = field.options.find((o) => o.id === optionId);
    if (option && option.costModifier) {
      totalModifier *= option.costModifier;
    }
  });

  const finalCost = Math.ceil(baseCost * totalModifier * skillModifier);
  const finalCostDisplay = document.getElementById("calculated-final-cost");
  const finalCostInput = document.getElementById("magic-final-cost-input");

  if (finalCostDisplay) {
    finalCostDisplay.textContent = `Custo Final: ${finalCost}`;
  }

  if (finalCostInput) {
    finalCostInput.textContent = `Custo Final: ${finalCost}`;
  }

  updateFinalDiceDisplay();
}

// Update dice display based on selected essence quantities
function updateFinalDiceDisplay() {
  const essenceQuantityInputs = document.querySelectorAll(".essence-quantity");
  const essenceQuantities = {};

  essenceQuantityInputs.forEach((input) => {
    const essenceId = input.dataset.essenceId;
    const checkbox = document.getElementById(`essence-checkbox-${essenceId}`);
    const quantity = parseInt(input.value) || 0;

    if (checkbox && checkbox.checked && quantity > 0) {
      essenceQuantities[essenceId] = quantity;
    }
  });

  const componentSelects = document.querySelectorAll(".magic-component-select");
  const componentSelections = {};
  componentSelects.forEach((select) => {
    const fieldId = select.dataset.fieldId;
    const value = select.value;
    if (value) {
      componentSelections[fieldId] = value;
    }
  });

  const tempMagic = new Magic("temp", componentSelections, essenceQuantities);

  const finalDice = tempMagic.getFinalDice();
  const finalDiceDisplay = tempMagic.getFinalDiceDisplay(finalDice);

  const finalDiceDisplayElement = document.getElementById(
    "calculated-final-dice"
  );
  const diceInput = document.getElementById("magic-dice-input");

  if (finalDiceDisplayElement) {
    finalDiceDisplayElement.textContent = `Dados: ${finalDiceDisplay}`;
  }

  if (diceInput) {
    diceInput.value = finalDice === "0" ? "" : finalDice;
    diceInput.placeholder = finalDice === "0" ? "Nenhum dado" : finalDice;
  }
}

// Functions for UI interaction
function addMagicSpell() {
  const nameInput = document.getElementById("magic-name-input");
  const costInput = document.getElementById("magic-cost-input");
  const diceInput = document.getElementById("magic-dice-input");
  const skillModifierInput = document.getElementById(
    "magic-skill-modifier-input"
  );
  const componentSelects = document.querySelectorAll(".magic-component-select");
  const essenceQuantityInputs = document.querySelectorAll(".essence-quantity");

  if (!nameInput || !costInput || !diceInput) {
    alert("Erro: Elementos de entrada não encontrados.");
    return;
  }

  const name = nameInput.value;
  const baseCost = parseInt(costInput.value) || 1;
  const dice = diceInput.value.trim() || null;
  const skillModifier = skillModifierInput
    ? parseFloat(skillModifierInput.value) || 1.0
    : 1.0;

  const essenceQuantities = {};
  essenceQuantityInputs.forEach((input) => {
    const essenceId = input.dataset.essenceId;
    const checkbox = document.getElementById(`essence-checkbox-${essenceId}`);
    const quantity = parseInt(input.value) || 0;

    if (checkbox && checkbox.checked && quantity > 0) {
      essenceQuantities[essenceId] = quantity;
    }
  });

  const componentSelections = {};
  componentSelects.forEach((select) => {
    const fieldId = select.dataset.fieldId;
    const value = select.value;
    if (value) {
      componentSelections[fieldId] = value;
    }
  });

  if (
    magicManager.addMagicWithEssences(
      name,
      componentSelections,
      essenceQuantities,
      baseCost,
      dice,
      skillModifier
    )
  ) {
    nameInput.value = "";
    costInput.value = "1";
    diceInput.value = "";
    diceInput.placeholder = "Nenhum dado";

    componentSelects.forEach((select) => {
      const fieldId = select.dataset.fieldId;
      const field = magicManager.componentFields.find((f) => f.id === fieldId);

      if (field && field.required && field.options.length > 0) {
        select.value = field.options[0].id;
      } else {
        select.value = "";
      }
    });

    essenceQuantityInputs.forEach((input) => {
      input.value = "0";
    });

    updateBaseCostFromEssences();

    clearTimeout(window.saveTimeout);
    window.saveTimeout = setTimeout(() => {
      saveCharacterDataToStorage();
    }, 500);
  }
}

// Handle keyboard input for magic creation
function handleMagicInputKeypress(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addMagicSpell();
  }
}

// Function to roll magic dice
function rollMagicDice(magicId) {
  if (!magicManager) return;

  const magic = magicManager.magics.find((m) => m.id === magicId);
  if (!magic) return;

  const diceString = magic.dice || magic.getFinalDice();
  if (!diceString || diceString === "0") {
    alert("Esta magia não possui dados para rolar.");
    return;
  }

  const rollResult = parseDiceStringAndRoll(diceString);

  if (rollResult.error) {
    alert(`Erro ao rolar dados: ${rollResult.error}`);
    return;
  }

  const resultMessage = `🎲 ${magic.name}\n\nDados: ${diceString}\nResultado: ${rollResult.total}\n\nDetalhes: ${rollResult.details.join(", ")}`;
  alert(resultMessage);
}

// Function to clear all magics (can be called from UI)
function clearAllMagics() {
  if (magicManager) {
    magicManager.clearAllMagics();

    clearTimeout(window.saveTimeout);
    window.saveTimeout = setTimeout(() => {
      saveCharacterDataToStorage();
    }, 500);
  }
}
