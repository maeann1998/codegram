import { htmlToElement } from '../utils/string-to-html';
import { ViewModel } from '../lib/view-model/view-model';
import { ImViewModel } from './im.viewmodel';
import { viewManager } from '../core';

const template = require('./im.template.html');

const model = new ImViewModel();

export const imViewModel = new ViewModel(htmlToElement(template), model);
