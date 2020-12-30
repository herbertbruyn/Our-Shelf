import { FormValidationBuilder } from '@/common';

export default ({ }, inject) => {
  inject('createRules', (validationString, errorMessage) => FormValidationBuilder(validationString, errorMessage));
}
