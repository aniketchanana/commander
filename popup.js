const addNewCommandRow = () => {
  const template = document.getElementById('commandTemplate');
  const clone = template.content.cloneNode(true);
  document.getElementById('commanderContainer').appendChild(clone);
};

const key = 'commandMappings';
const populateCommands = (commands) => {
  const commanderContainer = document.getElementById('commanderContainer');
  const commandTemplate = document.getElementById('commandTemplate');

  commands.forEach((cmd) => {
    const clone = commandTemplate.content.cloneNode(true);
    const row = clone.querySelector('.commandRow');

    const modifierSelect = row.querySelector('.modifierSelect');
    modifierSelect.value = cmd.MainKey === 'CTRL' ? 'CMD/CTRL' : cmd.MainKey;

    const keySelect = row.querySelector('.keySelect');
    keySelect.value = cmd.SecondaryKey;

    const textArea = row.querySelector('.commandText');
    textArea.value = cmd.Selector;

    commanderContainer.appendChild(clone);
  });
};

const saveCommandsToStorage = (e) => {
  e.preventDefault();

  const commandRows = commanderContainer.querySelectorAll('.commandRow');
  const commands = [];

  commandRows.forEach((row) => {
    const modifier = row.querySelector('.modifierSelect').value.trim();
    const key = row.querySelector('.keySelect').value.trim();
    const func = row.querySelector('.commandText').value.trim();

    if (modifier && key && func) {
      commands.push({
        MainKey: modifier === 'CMD/CTRL' ? 'CTRL' : modifier, // Normalize if needed
        SecondaryKey: key,
        Selector: func,
      });
    }
  });

  chrome.storage.local.set({ [key]: commands }, () => {
    alert('Commands saved!');
  });
};

const removeCommandRow = (e) => {
  if (e.target.classList.contains('removeBtn')) {
    e.target.closest('.commandRow').remove();
  }
};

document
  .getElementById('addNewCmdBtn')
  .addEventListener('click', addNewCommandRow);

document
  .getElementById('commanderContainer')
  .addEventListener('click', removeCommandRow);

document
  .getElementById('commandMapperForm')
  .addEventListener('submit', saveCommandsToStorage);

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get([key], (result) => {
    const mappings = result[key] || [];
    populateCommands(mappings);
  });
});
