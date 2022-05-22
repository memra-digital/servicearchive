/*
=====================================
  © Memra Digital, 2019-2022
  Licensed under the GPLv3 license.
=====================================
*/

import './styles/global.css';
import './core/language';
import './core/themes';
import './gui/sidebar/main';
import './gui/tabs/main';
import './gui/editor/main';
import './gui/sync/main';
import './gui/settings/main';

import { ServiceAPI } from './core/api';
(<any>window).ServiceAPI = new ServiceAPI();