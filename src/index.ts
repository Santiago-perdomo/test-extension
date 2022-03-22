import { init } from 'dc-extensions-sdk';
import type { ContentFieldExtension } from 'dc-extensions-sdk';

// define the input field model
interface FieldModel {
  title: string;
  type: string;
  control: string;
  format: string;
  minLength: number;
  maxLength: number;
}

// define the installation config parameters
interface Parameters {
  instance: {};
  installation: {
    configParam: string;
  };
}

async function initialize() {
  const sdk = await init<ContentFieldExtension<FieldModel, Parameters>>();
}

initialize();