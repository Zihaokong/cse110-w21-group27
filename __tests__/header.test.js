require('../source/header-comp');

describe('Header Testing completed values', () => {
  test('Create Header where completed = 0', () => {
    Storage.prototype.getItem = jest.fn(() => 0);
    const header = document.createElement('header-comp');
    document.body.appendChild(header);
    expect(header.completedCycles).toBe('0');
    expect(header.cycleCount).toBe('4');
    expect(header.isNewCycle).toBe('true');
    expect(
      header.shadowRoot
        .getElementById('cycle-count')
        .querySelectorAll('.filled-dot').length
    ).toBe(0);
    expect(
      header.shadowRoot.getElementById('cycle-count').querySelectorAll('.dot')
        .length
    ).toBe(4);
  });

  test('Create Header where completed = 2', () => {
    Storage.prototype.getItem = jest.fn(() => 2);
    const header = document.createElement('header-comp');
    document.body.appendChild(header);
    expect(header.completedCycles).toBe('2');
    expect(header.cycleCount).toBe('2');
    expect(header.isNewCycle).toBe('false');
    expect(
      header.shadowRoot
        .getElementById('cycle-count')
        .querySelectorAll('.filled-dot').length
    ).toBe(2);
    expect(
      header.shadowRoot.getElementById('cycle-count').querySelectorAll('.dot')
        .length
    ).toBe(2);
  });

  test('Create Header where completed = 1', () => {
    Storage.prototype.getItem = jest.fn(() => 1);
    const header = document.createElement('header-comp');
    document.body.appendChild(header);
    expect(header.completedCycles).toBe('1');
    expect(header.cycleCount).toBe('3');
    expect(header.isNewCycle).toBe('false');
    expect(
      header.shadowRoot
        .getElementById('cycle-count')
        .querySelectorAll('.filled-dot').length
    ).toBe(1);
    expect(
      header.shadowRoot.getElementById('cycle-count').querySelectorAll('.dot')
        .length
    ).toBe(3);
  });

  test('Create Header where completed = 4', () => {
    Storage.prototype.getItem = jest.fn(() => 4);
    const header = document.createElement('header-comp');
    document.body.appendChild(header);
    expect(header.completedCycles).toBe('4');
    expect(header.cycleCount).toBe('4');
    expect(header.isNewCycle).toBe('true');
    expect(
      header.shadowRoot
        .getElementById('cycle-count')
        .querySelectorAll('.filled-dot').length
    ).toBe(0);
    expect(
      header.shadowRoot.getElementById('cycle-count').querySelectorAll('.dot')
        .length
    ).toBe(4);
  });

  test('Create Header where completed = 5', () => {
    Storage.prototype.getItem = jest.fn(() => 5);
    const header = document.createElement('header-comp');
    document.body.appendChild(header);
    expect(header.completedCycles).toBe('5');
    expect(header.cycleCount).toBe('3');
    expect(header.isNewCycle).toBe('false');
    expect(
      header.shadowRoot
        .getElementById('cycle-count')
        .querySelectorAll('.filled-dot').length
    ).toBe(1);
    expect(
      header.shadowRoot.getElementById('cycle-count').querySelectorAll('.dot')
        .length
    ).toBe(3);
  });

  test('Create Header where completed = 0 - 1000', () => {
    for (let i = 0; i < 1000; i++) {
      Storage.prototype.getItem = jest.fn(() => i);
      const header = document.createElement('header-comp');
      document.body.appendChild(header);
      expect(header.completedCycles).toBe(i.toString());
      expect(header.isNewCycle).toBe(
        header.completedCycles % 4 === 0 ? 'true' : 'false'
      );
      expect(
        header.shadowRoot
          .getElementById('cycle-count')
          .querySelectorAll('.filled-dot').length
      ).toBe(header.completedCycles % 4);
      expect(
        header.shadowRoot.getElementById('cycle-count').querySelectorAll('.dot')
          .length
      ).toBe(4 - (header.completedCycles % 4));
    }
  });
});

describe('Attribute Changed Callback testing', () => {
  test('Create Header where completed = 1 and set completedCycles to 2', () => {
    Storage.prototype.getItem = jest.fn(() => 1);
    const header = document.createElement('header-comp');
    document.body.appendChild(header);
    expect(header.completedCycles).toBe('1');
    expect(header.isNewCycle).toBe('false');
    expect(
      header.shadowRoot
        .getElementById('cycle-count')
        .querySelectorAll('.filled-dot').length
    ).toBe(1);
    expect(
      header.shadowRoot.getElementById('cycle-count').querySelectorAll('.dot')
        .length
    ).toBe(3);
    header.completedCycles = 2;
    expect(header.completedCycles).toBe('2');
    expect(header.isNewCycle).toBe('false');
    expect(
      header.shadowRoot
        .getElementById('cycle-count')
        .querySelectorAll('.filled-dot').length
    ).toBe(2);
    expect(
      header.shadowRoot.getElementById('cycle-count').querySelectorAll('.dot')
        .length
    ).toBe(2);
  });

  test('Create Header where completed = 1 and set completedCycles to 4', () => {
    Storage.prototype.getItem = jest.fn(() => 1);
    const header = document.createElement('header-comp');
    document.body.appendChild(header);
    expect(header.completedCycles).toBe('1');
    expect(header.isNewCycle).toBe('false');
    expect(
      header.shadowRoot
        .getElementById('cycle-count')
        .querySelectorAll('.filled-dot').length
    ).toBe(1);
    expect(
      header.shadowRoot.getElementById('cycle-count').querySelectorAll('.dot')
        .length
    ).toBe(3);
    header.completedCycles = 4;
    expect(header.completedCycles).toBe('4');
    expect(header.isNewCycle).toBe('false');
    expect(
      header.shadowRoot
        .getElementById('cycle-count')
        .querySelectorAll('.filled-dot').length
    ).toBe(4);
    expect(
      header.shadowRoot.getElementById('cycle-count').querySelectorAll('.dot')
        .length
    ).toBe(0);
  });

  test('Create Header where completed = 1 and set isnewCycle to true', () => {
    Storage.prototype.getItem = jest.fn(() => 1);
    const header = document.createElement('header-comp');
    document.body.appendChild(header);
    expect(header.completedCycles).toBe('1');
    expect(header.isNewCycle).toBe('false');
    expect(
      header.shadowRoot
        .getElementById('cycle-count')
        .querySelectorAll('.filled-dot').length
    ).toBe(1);
    expect(
      header.shadowRoot.getElementById('cycle-count').querySelectorAll('.dot')
        .length
    ).toBe(3);
    // Not sure if this is intentional, but when you set isNewCycle to true, it
    // it keeps the amount filled dots but puts 4 empty dots.
    header.isNewCycle = 'true';
    expect(header.completedCycles).toBe('1');
    expect(header.isNewCycle).toBe('true');
    expect(
      header.shadowRoot
        .getElementById('cycle-count')
        .querySelectorAll('.filled-dot').length
    ).toBe(1);
    expect(
      header.shadowRoot.getElementById('cycle-count').querySelectorAll('.dot')
        .length
    ).toBe(4);
  });
});
