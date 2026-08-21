import { localeData } from '../../utils/locale.utils';

export const positiveTests = [
  {
    values: {
      "firstName": "Test", 
      "lastName": "User",
      "phoneNumber": "+12345678910",
      "province": localeData.common.provinces.ON,
      "region": "ON",
      "password": "Password!456",
      "confirmPassword": "Password!456",
      "agreement": false
    },
  },
  {
    values: {
      "firstName": "François ", 
      "lastName": "D'Angelo ",
      "phoneNumber": "+4612345678910",
      "province": localeData.common.provinces.QC,
      "region": "QC",
      "password": "Password!12345677888989080989079",
      "confirmPassword": "Password!12345677888989080989079",
      "agreement": true
    },
  }
]

export const negativeTests = [
    {
      title: 'form submitted is empty',
      values: {},
      expectedErrors: {
        'password': localeData.common.errorMessages.passwordMinimumLength,
        'firstName': localeData.common.errorMessages.requiredField,
        'lastName': localeData.common.errorMessages.requiredField,
        'phoneNumber': localeData.common.errorMessages.invalidValue,
        'email': localeData.common.errorMessages.invalidEmail
      },
    },
    {
      title: 'name is invalid',
      values: {
        firstName: "123",
        lastName: "123"
      },
      expectedErrors: {
        'firstName': localeData.common.errorMessages.invalidName,
        'lastName': localeData.common.errorMessages.invalidName,
      },
    },
    {
      title: 'first name is too long',
      values: {
        firstName: "adsfsdvfsbfdbfgsnhmjhgfdwsdfghjhgfdsadfghjgfdvcsadsfsdffffggghij",
        lastName: " "
      },
      expectedErrors: {
        'firstName': localeData.common.errorMessages.longName,
        'lastName': localeData.common.errorMessages.requiredField,
      },
    },
    {
      title: 'last name is too long',
      values: {
        lastName: "adsfsdvfsbfdbfgsnhmjhgfdwsdfghjhgfdsadfghjgfdvcsadsfsdffffggghij",
        firstName: " "
      },
      expectedErrors: {
        'firstName': localeData.common.errorMessages.requiredField,
        'lastName': localeData.common.errorMessages.longName,
      },
    },
    {
      title: 'email is invalid',
      values: {
        firstName: "John",
        lastName: "McGuire",
        email: "john @xyz.in",
      },
      expectedErrors: {
        'email': localeData.common.errorMessages.invalidEmail,
      },
    },
    {
      title: 'password contains less than 12 characters',
      values: {
        "password": "Password!24",
        "confirmPassword": "Password!24"
      },
      expectedErrors: {
        'password': localeData.common.errorMessages.passwordMinimumLength,
      }
    },
    {
        title: 'password contains more than 32 characters',
        values: {
          "password": "Password!123456789101234567891012"
        },
        expectedErrors: {
          'password': localeData.common.errorMessages.passwordMaximumLength,
        }
    },
    {
        title: 'password does not contain uppercase letter',
        values: {
          "password": "abcdefghijk1",
          "confirmPassword": "abcdefghijk1",
        },
        expectedErrors: {
          'password': localeData.common.errorMessages.passwordCriteria,
        }
    },
    {
        title: 'password field does not contain lowercase letter',
        values: {
          "password": "123456789ABC",
          "confirmPassword": "123456789ABC",
        },
        expectedErrors: {
          'password': localeData.common.errorMessages.passwordCriteria,
        }
    },
    {
        title: 'password does not contain a number',
        values: {
          "password": "Abcdefghijkl",
        },
        expectedErrors: {
          'password': localeData.common.errorMessages.passwordCriteria,
        }
    },
]

export const countriesTotal = 246;
