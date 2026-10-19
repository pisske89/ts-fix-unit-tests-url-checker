import { calculatePasswordStrength } from '../src/passwordStrength';

describe('calculatePasswordStrength', () => {

    // Equivalence Partitioning: Very Weak passwords
    test('should return "Very Weak" for an empty password', () => {
        expect(calculatePasswordStrength('')).toBe('Very Weak');
    });

    test('should return "Very Weak" for a short password with no variety', () => {
        expect(calculatePasswordStrength('abc')).toBe('Very Weak');
    });

    // Equivalence Partitioning: Weak passwords
    test('should return "Weak" for a password with lowercase, digits and length >= 8', () => {
        expect(calculatePasswordStrength('abcdef1g')).toBe('Weak');
    });

    // Equivalence Partitioning: Moderate passwords
    test('should return "Moderate" for password with lowercase, uppercase and digits', () => {
        expect(calculatePasswordStrength('Abcdef1g')).toBe('Moderate');
    });

    // Equivalence Partitioning: Strong passwords
    test('should return "Strong" for a password with all character types and length >= 12', () => {
        expect(calculatePasswordStrength('Abcdef1g!@#$')).toBe('Strong');
    });

    // Boundary Value Analysis: exactly 8 characters
    test('should gain length bonus at exactly 8 characters', () => {
        const result = calculatePasswordStrength('abcdef1g');
        expect(result).not.toBe('Very Weak');
    });

    // Boundary Value Analysis: exactly 12 characters
    test('should gain extra length bonus at exactly 12 characters', () => {
        expect(calculatePasswordStrength('abcdefghijkl')).not.toBe('Very Weak');
    });

    // Boundary Value Analysis: 7 characters (just below 8)
    test('should not get length bonus for 7-character password', () => {
        expect(calculatePasswordStrength('abcdefg')).toBe('Very Weak');
    });

    // Special characters test
    test('should return "Strong" when special characters are included', () => {
        expect(calculatePasswordStrength('Abc1!xyz@')).toBe('Strong');
    });

    // Only digits
    test('should return "Very Weak" for digits only short password', () => {
        expect(calculatePasswordStrength('123')).toBe('Very Weak');
    });

    // Only uppercase + digit
    test('should return "Weak" for 8-char uppercase and digit password', () => {
        expect(calculatePasswordStrength('ABCDEF1G')).toBe('Weak');
    });

});