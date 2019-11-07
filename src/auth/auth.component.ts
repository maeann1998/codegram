import { htmlToElement } from '../utils/string-to-html';
import { ViewModel } from '../lib/view-model/view-model';
import { AuthViewModel } from './auth.viewmodel';
import { viewManager } from '../core';

const template = require('./auth.template.html');

const model = new AuthViewModel();

export const authViewModel = new ViewModel(htmlToElement(template), model);
