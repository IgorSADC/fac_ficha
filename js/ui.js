// UI Components for Character Sheet Rendering

// Extensible Component System for Character Sheet
class SkillSectionComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  // Render a skill section from JSON configuration
  renderSection(config) {
    const attributeHtml = config.attribute
      ? `
              <div class="text-center mb-3">
                <div class="attribute-circle">
                  <div class="attribute-label">${config.attribute.label}</div>
                  <input
                    type="number"
                    class="form-control form-control-sm"
                    style="width: 50px; text-align: center"
                    value="0"
                    min="0"
                    max="3"
                    data-attribute="${config.attribute.dataAttribute}"
                    onchange="validateAttributeAndSkills('${config.attribute.dataAttribute}', '${config.sectionId}')"
                  />
                </div>
                <button class="btn btn-sm btn-outline-primary mt-1" onclick="rollAttribute('${config.attribute.dataAttribute}', '${config.attribute.label}')" title="Rolar ${config.attribute.label}">
                  🎲 Rolar
                </button>
              </div>
            `
      : "";

    console.log("---config");
    console.log(config);

    const sectionHtml = `
                      <div class="skill-${config.sectionId}-section">
                          ${attributeHtml}
                          <div class="section-title" onclick="${config.onClick || "void(0)"
      }" style="cursor: ${config.onClick ? "pointer" : "default"
      }">
                              ${config.label}
                          </div>
                          <div class="checkbox-list">
                              ${this.generateCheckboxes(
        config.skills,
        config.sectionId
      )}
                              ${config.prestigios &&
        config.prestigios.length > 0
        ? `
                              <div class="prestigio-divider" style="margin: 15px 0; border-top: 2px solid #007bff; position: relative;">
                                  <span style="background: #f8f9fa; padding: 0 10px; position: absolute; top: -10px; left: 50%; transform: translateX(-50%); font-weight: bold; color: #007bff;">Prestígio</span>
                              </div>
                              ${this.generatePrestigioCheckboxes(
          config.prestigios,
          config.sectionId
        )}
                              `
        : ""
      }
                          </div>
                      </div>
                  `;
    return sectionHtml;
  }

  // Generate checkboxes based on skills array - now with 3 levels
  generateCheckboxes(skills, sectionId) {
    return skills
      .map(
        (skill, index) => `
                      <div class="form-check skill-levels" data-skill="${skill.name
          }" data-section="${sectionId}">
                          <label class="form-check-label skill-name">${skill.name
          }${skill.info
            ? `<button class="essence-info-btn" onclick="showInfo('skill-${skill.name
              .replace(/\s+/g, "-")
              .toLowerCase()}', '${skill.name}', \`${skill.info
            }\`)" title="Informações sobre ${skill.name}">ℹ</button>`
            : ""
          }</label>
                          <div class="skill-level-boxes">
                              <input class="form-check-input skill-level" type="checkbox" id="${sectionId}_${index}_1" data-skill="${skill.name
          }" data-section="${sectionId}" data-level="1" onclick="toggleSkillLevel(this, 1)">
                              <label class="level-label" for="${sectionId}_${index}_1">1</label>
                              <input class="form-check-input skill-level" type="checkbox" id="${sectionId}_${index}_2" data-skill="${skill.name
          }" data-section="${sectionId}" data-level="2" onclick="toggleSkillLevel(this, 2)">
                              <label class="level-label" for="${sectionId}_${index}_2">2</label>
                              <input class="form-check-input skill-level" type="checkbox" id="${sectionId}_${index}_3" data-skill="${skill.name
          }" data-section="${sectionId}" data-level="3" onclick="toggleSkillLevel(this, 3)">
                              <label class="level-label" for="${sectionId}_${index}_3">3</label>
                              <button class="btn btn-xs btn-outline-success ms-2" onclick="rollSkill('${sectionId}', '${skill.name
          }')" title="Rolar ${skill.name
          }" style="font-size: 10px; padding: 2px 6px;">
                                🎲
                              </button>
                          </div>
                      </div>
                  `
      )
      .join("");
  }

  // Generate special Prestígio checkboxes (1 attribute point each)
  generatePrestigioCheckboxes(prestigios, sectionId) {
    console.log("----Generationg prestio checkbox----");
    return prestigios
      .map((prestigio, index) => {
        const infoButton = prestigio.info
          ? `<button class="essence-info-btn" onclick="showInfo('prestigio-${prestigio.name
            .replace(/\s+/g, "-")
            .toLowerCase()}', '${prestigio.name
          }', '${prestigio.info.replace(
            /'/g,
            "&#39;"
          )}', '')" title="Informações sobre ${prestigio.name
          }">ℹ</button>`
          : "";

        return `
                      <div class="form-check skill-levels prestigio-skill" data-skill="${prestigio.name}" data-section="${sectionId}">
                          <label class="form-check-label skill-name" style="color: #007bff; font-weight: bold;">${prestigio.name}${infoButton}</label>
                          <div class="skill-level-boxes">
                              <input class="form-check-input prestigio-level" type="checkbox" id="${sectionId}_prestigio_${index}" data-skill="${prestigio.name}" data-section="${sectionId}" data-prestigio="true" onclick="togglePrestigioSkill(this)">
                              <label class="level-label" for="${sectionId}_prestigio_${index}" style="color: #007bff;">✓</label>
                              <span class="prestigio-cost" style="font-size: 10px; color: #666; margin-left: 5px;">(1 pt. atributo)</span>
                          </div>
                      </div>
                  `;
      })
      .join("");
  }

  // Render multiple sections from JSON array
  renderFromJson(sectionsConfig) {
    let html = "";
    sectionsConfig.forEach((config) => {
      html += this.renderSection(config);
    });
    if (this.container) {
      this.container.innerHTML = html;
    }
    return html;
  }
}

// Resource/Stat Component for HP, Mana, etc.
class ResourceComponent {
  constructor() {}

  // Render a resource section from JSON configuration
  renderResourceSection(config) {
    const diceSelector = config.diceType
      ? `
              <div class="col-12 mb-2">
                <div class="d-flex align-items-center justify-content-center">
                  <label class="form-label me-2 mb-0"><strong>Dado:</strong></label>
                  <select class="form-select form-select-sm dice-selector" style="width: auto;" id="${config.diceSelectId
        }" onchange="onDiceTypeChange('${config.resourceName}')">
                    <option value="d4" ${config.diceType === "d4" ? "selected" : ""
        }>d4</option>
                    <option value="d6" ${config.diceType === "d6" ? "selected" : ""
        }>d6</option>
                    <option value="d8" ${config.diceType === "d8" ? "selected" : ""
        }>d8</option>
                    <option value="d10" ${config.diceType === "d10" ? "selected" : ""
        }>d10</option>
                    <option value="d12" ${config.diceType === "d12" ? "selected" : ""
        }>d12</option>
                  </select>
                  <button class="btn btn-sm btn-outline-warning ms-2" onclick="rollResourceDice('${config.resourceName
        }', '${config.diceSelectId
        }')" title="Substituir rolls automáticos por rolls manuais">
                    🎲 Manual
                  </button>
                </div>
              </div>
            `
      : "";

    const resourceHtml = `
              <div class="col-md-${config.columnSize || 6}">
                <div class="hp-mana-section">
                  <div class="row">
                    ${diceSelector}
                    <div class="col-4">
                      <label class="form-label"><strong>Base ${config.resourceName
        }</strong></label>
                      <input
                        type="number"
                        class="form-control large-input"
                        id="${config.baseId}"
                        placeholder="${config.basePlaceholder || "0"}"
                        readonly
                        style="background-color: #f8f9fa; cursor: not-allowed;"
                      />
                      <button class="btn btn-xs btn-outline-info mt-1" style="font-size: 10px; padding: 2px 6px;" onclick="showResourceRollHistory('${config.resourceName
        }')" title="Ver histórico de rolls">
                        📋 Histórico
                      </button>
                    </div>
                    <div class="col-4">
                      <label class="form-label"><strong>Extra ${config.resourceName
        }</strong></label>
                      <input
                        type="number"
                        class="form-control large-input"
                        id="${config.extraId}"
                        placeholder="${config.extraPlaceholder || "0"}"
                        onchange="calculateResourceTotal('${config.resourceName
        }')"
                      />
                    </div>
                    <div class="col-4">
                      <label class="form-label"><strong>${config.totalLabel
        }</strong></label>
                      <input
                        type="number"
                        class="form-control large-input"
                        id="${config.totalId}"
                        placeholder="${config.totalPlaceholder || "0"}"
                        readonly
                        style="background-color: #f8f9fa; cursor: not-allowed;"
                      />
                    </div>
                    <div class="col-12 mt-2">
                      <label class="form-label"><strong>${config.currentLabel
        }</strong></label>
                      <input
                        type="number"
                        class="form-control large-input"
                        id="${config.currentId}"
                        placeholder="${config.currentPlaceholder || "0"}"
                      />
                    </div>
                  </div>
                </div>
              </div>
            `;
    return resourceHtml;
  }

  // Render multiple resource sections from JSON array
  renderFromJson(resourcesConfig, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return "";

    let html = '<div class="row mb-3">';
    resourcesConfig.forEach((config) => {
      html += this.renderResourceSection(config);
    });
    html += "</div>";

    container.innerHTML = html;
    return html;
  }
}

// Function to render all sections from JSON in the main layout
function renderAllSectionsInLayout(skillComponent) {
  const dynamicContainer = document.getElementById("dynamic-skill-sections");
  const additionalContainer = document.getElementById("additional-skill-sections");

  if (!dynamicContainer || !additionalContainer) return;

  // Clear containers
  dynamicContainer.innerHTML = "";
  additionalContainer.innerHTML = "";

  // Define which sections go where (customize as needed)
  const mainSections = [0, 1, 2, 7]; // Conhecimento, Social, Cultura, Magia (indices in skillSectionsConfig)
  const additionalSections = [3, 4, 5, 6]; // Atletismo, Manufatura, Combate, Sobrevivência

  // Render main sections (Conhecimento, Social, Cultura, Magia)
  let mainHtml = '<div class="row">';
  mainSections.forEach((configIndex) => {
    if (skillSectionsConfig[configIndex]) {
      const config = skillSectionsConfig[configIndex];
      mainHtml += `
                <div class="col-md-3">
                  ${skillComponent.renderSection(config)}
                </div>
              `;
    }
  });
  mainHtml += "</div>";
  dynamicContainer.innerHTML = mainHtml;

  // Render additional sections (Atletismo, Manufatura, Combate, Sobrevivência)
  let additionalHtml = '<div class="row">';
  additionalSections.forEach((configIndex) => {
    if (skillSectionsConfig[configIndex]) {
      const config = skillSectionsConfig[configIndex];
      additionalHtml += `
                <div class="col-md-3">
                  ${skillComponent.renderSection(config)}
                </div>
              `;
    }
  });
  additionalHtml += "</div>";
  additionalContainer.innerHTML = additionalHtml;

  console.log("All JSON sections rendered in main layout with attributes");
}

function toggleAllSectionsPreview() {
  const previewDiv = document.getElementById("all-sections-preview");
  if (previewDiv) {
    if (previewDiv.style.display === "none") {
      previewDiv.style.display = "block";
    } else {
      previewDiv.style.display = "none";
    }
  }
}

// Generic info popup functions that can be reused for any type of content
function showInfo(type, title, content, customClasses = "") {
  const overlayId = `${type}-info-overlay`;
  const popupId = `${type}-info-popup`;

  // Create overlay if it doesn't exist
  let overlay = document.getElementById(overlayId);
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = overlayId;
    overlay.className = `essence-info-popup-overlay ${customClasses}`;
    overlay.onclick = () => hideInfo(type);
    document.body.appendChild(overlay);
  }

  // Create popup if it doesn't exist
  let popup = document.getElementById(popupId);
  if (!popup) {
    popup = document.createElement("div");
    popup.id = popupId;
    popup.className = `essence-info-popup ${customClasses}`;
    document.body.appendChild(popup);
  }

  // Set popup content
  popup.innerHTML = `
            <div class="essence-info-popup-header">
              <h3 class="essence-info-popup-title">${title}</h3>
              <button class="essence-info-popup-close" onclick="hideInfo('${type}')" title="Fechar">×</button>
            </div>
            <div class="essence-info-popup-content">
              ${content}
            </div>
          `;

  // Show overlay and popup
  overlay.classList.add("show");
  popup.classList.add("show");

  // Store current popup type for escape key handling
  document.body.dataset.currentPopupType = type;

  // Prevent body scroll
  document.body.style.overflow = "hidden";
}

function hideInfo(type) {
  const overlayId = `${type}-info-overlay`;
  const popupId = `${type}-info-popup`;

  const overlay = document.getElementById(overlayId);
  const popup = document.getElementById(popupId);

  if (overlay) {
    overlay.classList.remove("show");
  }
  if (popup) {
    popup.classList.remove("show");
  }

  // Clear current popup type
  delete document.body.dataset.currentPopupType;

  // Restore body scroll
  document.body.style.overflow = "";
}

// Hide any currently visible popup
function hideCurrentPopup() {
  const currentType = document.body.dataset.currentPopupType;
  if (currentType) {
    hideInfo(currentType);
  }
}

// Inject dynamic CSS styles
const style = document.createElement("style");
style.textContent = `
              .highlighted .section-title {
                  background: #007bff !important;
                  transform: scale(1.02);
                  transition: all 0.2s ease;
              }
              .section-title:hover {
                  opacity: 0.8;
                  transition: opacity 0.2s ease;
              }
              .skill-level:disabled {
                  opacity: 0.3 !important;
                  cursor: not-allowed !important;
              }
              .skill-level:disabled + .level-label {
                  color: #6c757d !important;
                  opacity: 0.3 !important;
              }
              .skill-levels:not(.disabled) .skill-level:not(:disabled) {
                  opacity: 1;
                  cursor: pointer;
              }
              .skill-levels:not(.disabled) .skill-level:not(:disabled) + .level-label {
                  color: inherit;
                  opacity: 1;
              }
              input[data-attribute] {
                  border: 2px solid #333;
                  font-weight: bold;
              }
              input[data-attribute]:focus {
                  border-color: #007bff;
                  box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
              }
              .essence-quantity:disabled {
                  opacity: 0.5 !important;
                  background-color: #f8f9fa !important;
                  cursor: not-allowed !important;
              }
              .essence-quantity-container {
                  margin-bottom: 8px;
              }
              .essence-checkbox {
                  margin-right: 8px;
              }
              .essence-label {
                  min-width: 120px;
                  font-weight: 500;
              }
          `;
document.head.appendChild(style);
