/** @type {import('next').NextConfig} */
import { resolve } from 'path';



export default {
    cacheHandler: resolve('./cache-handler.js'),
  }