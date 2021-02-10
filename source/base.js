/**
 * Student Name
 * @type {string}
 */
const studentName = 'Student Name';

const test1 = 's';

/**
 * Array of grades
 * @type {Array<number>}
 */
const grades = [1, 2, 3, 4];

/**
 * Todo Object
 * @type {{id: number|string, text: string}}
 */
const todo = {
  id: 1,
  text: 'Hello',
  text2: 'Hey',
};

/**
 * Add two numbers
 * @param {number} p1 - First addend
 * @param {number} p2 - Second addend
 * @returns {number} - Summation
 */
function exampleFunction(p1, p2) {
  return p1 + p2;
}

/**
 * A person
 * @typedef {Object} Person
 * @property {number} ssn - Person's Social Security Number
 * @property {string} name - Person's Name
 * @property {string|number} [age] - Person's age (optional)
 * @property {boolean} isActive - Person is active
 */

/**
 * @type {Person}
 */
const person = {
  id: 123456789,
  name: 'John Doe',
  age: 20,
  isActive: true,
};

/**
 * Class to create a student
 */
class Student {
  /**
   *
   * @param {Object} studentInfo Information about the student
   */
  constructor(studentInfo) {
    /**
     * @property {string} name Student's name
     */
    this.name = studentInfo.name;
  }

  /**
   * @property {Function} greet A greeting with the name
   * @returns void
   */
  greet() {
    console.log(`Hello there ${this.name}`);
  }
}

/**
 * Student one
 * See {@link Student}
 */

const student1 = new Student({
  name: 'Jake',
});
