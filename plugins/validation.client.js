import { entities, enums, patterns, propsValidators , formRules } from '@/common';

export default ({ }, inject) => {
  inject('entities', entities);
  inject('enums', enums);
  inject('patterns', patterns);
  inject('propsValidators', propsValidators);
  inject('formRules', formRules);
  inject('formRules', formRules);
}
