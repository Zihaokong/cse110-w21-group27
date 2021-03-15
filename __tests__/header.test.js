require('../source/header-comp');

describe('Header Testing', () => {
  test('Create Header where completed = "0"', () => {
    Storage.prototype.getItem = jest.fn(() => '0');
    const header = document.createElement('header-comp');
    document.body.appendChild(header);
    expect(header.completedCycles).toBe('0');
    expect(header.cycleCount).toBe('4');
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

  test('Create Header where completed = 1', () => {
    Storage.prototype.getItem = jest.fn(() => 1);
    const header = document.createElement('header-comp');
    document.body.appendChild(header);
    expect(header.completedCycles).toBe('1');
    expect(header.cycleCount).toBe('3');
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

  test('Create Header where completed = 5', () => {
    Storage.prototype.getItem = jest.fn(() => 5);
    const header = document.createElement('header-comp');
    document.body.appendChild(header);
    expect(header.completedCycles).toBe('5');
    expect(header.cycleCount).toBe('3');
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
    for (let i = 5; i < 1000; i++) {
      Storage.prototype.getItem = jest.fn(() => i);
      const header = document.createElement('header-comp');
      document.body.appendChild(header);
      expect(header.completedCycles).toBe(String(i));
      expect(header.cycleCount).toBe(String(4 - (i % 4)));
      expect(
        header.shadowRoot
          .getElementById('cycle-count')
          .querySelectorAll('.filled-dot').length
      ).toBe(((i - 1) % 4) + 1);
      expect(
        header.shadowRoot.getElementById('cycle-count').querySelectorAll('.dot')
          .length
      ).toBe(3 - ((i - 1) % 4));
    }
  });
});
