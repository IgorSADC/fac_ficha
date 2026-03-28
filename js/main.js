// App entry point — initializes all components when the DOM is ready
// Note: CSS style injection is handled by js/ui.js

document.addEventListener("DOMContentLoaded", function () {
  console.log("Character Sheet Extensible Components Initialized");

  // Initialize magic manager
  magicManager = new MagicManager();

  // Render dynamic sections using the component system
  const skillComponent = new SkillSectionComponent();
  const resourceComponent = new ResourceComponent();

  // Render resource sections (HP, Mana, etc.)
  resourceComponent.renderFromJson(
    resourceSectionsConfig,
    "resource-sections-container"
  );

  // Generate all sections HTML
  let allSectionsHtml = "";
  skillSectionsConfig.forEach((config) => {
    allSectionsHtml += skillComponent.renderSection(config);
  });

  // Render all JSON sections together in the main layout
  renderAllSectionsInLayout(skillComponent);

  // Also render all sections in the preview container if it exists
  const allSectionsContainer = document.getElementById(
    "all-sections-container"
  );
  if (allSectionsContainer) {
    allSectionsContainer.innerHTML = allSectionsHtml;
  }

  // Update the Sistema FAQ section (Conhecimento)
  const sistemaFaqSection = document.querySelector(
    '[data-section="sistema_faq"] .card-body'
  );
  if (sistemaFaqSection && skillSectionsConfig[0]) {
    // Conhecimento is index 0
    const conhecimentoConfig = skillSectionsConfig[0];
    const conhecimentoHtml = `
      <div class="checkbox-list">
        ${skillComponent.generateCheckboxes(
          conhecimentoConfig.skills,
          conhecimentoConfig.sectionId
        )}
      </div>
    `;
    sistemaFaqSection.innerHTML = conhecimentoHtml;
  }

  // Update the Magia section in the top area if it exists
  const magiaSection = document.querySelector(
    '[data-section="magia"] .card-body'
  );
  if (magiaSection && skillSectionsConfig[7]) {
    // Magia is index 7
    const magiaConfig = skillSectionsConfig[7];
    const magiaHtml = `
      <div class="checkbox-list">
        ${skillComponent.generateCheckboxes(
          magiaConfig.skills,
          magiaConfig.sectionId
        )}
      </div>
    `;
    magiaSection.innerHTML = magiaHtml;
  }

  console.log(
    "All sections have been dynamically updated with their configurations"
  );

  // Initial point calculation
  calculateTotalPoints();

  // Calculate available points
  calculateAvailablePoints();

  // Load any saved character data
  const hasLoadedData = loadCharacterDataFromStorage();

  // If no saved data was loaded, initialize skill availability with default values
  if (!hasLoadedData) {
    skillSectionsConfig.forEach((config) => {
      if (config.attribute) {
        updateSkillAvailability(config.sectionId, 0); // Start with 0 attribute values
      }
    });

    // Initialize previous level for new characters
    const levelElement = document.getElementById("character-level");
    if (levelElement) {
      levelElement.dataset.previousLevel = levelElement.textContent || "0";
    }
  }

  // Set up automatic saving
  setupAutoSave();

  // Update dice selector availability on initial load
  updateDiceSelectorAvailability();

  // Recalculate base resources after everything is loaded
  updateResourceBaseValues(false); // false indicates initialization, not dice type change

  // Render initial magic list
  if (magicManager) {
    magicManager.renderComponentOptions();
    magicManager.renderEssencesSelection();
    magicManager.renderMagicList();

    // Apply saved essence selection state immediately after rendering essences
    setTimeout(() => {
      try {
        const savedData = localStorage.getItem(
          SAVE_PREFIX + "character_sheet"
        );
        if (savedData) {
          const data = JSON.parse(savedData);
          if (data.currentEssenceSelection) {
            loadEssenceSelectionState(data.currentEssenceSelection);
          }
        }
      } catch (error) {
        console.error("Error loading essence selection state:", error);
      }

      updateFinalCostDisplay();
    }, 100);
  }

  // Add event listener for skill modifier input
  const skillModifierInput = document.getElementById(
    "magic-skill-modifier-input"
  );
  if (skillModifierInput) {
    skillModifierInput.addEventListener("input", function () {
      updateFinalCostDisplay();
    });
  }

  // Initialize skill modifier based on Feitiçaria level
  updateSkillModifierFromFeiticaria();
});

// Close popup with Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    hideCurrentPopup();
  }
});
