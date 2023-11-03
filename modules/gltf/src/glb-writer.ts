// loaders.gl, MIT license
// Copyright (c) vis.gl contributors

import type {WriterWithEncoder, WriterOptions} from '@loaders.gl/loader-utils';
import type {GLB} from './lib/types/glb-types';
import type {GLBEncodeOptions} from './lib/encoders/encode-glb';
import {encodeGLBSync} from './lib/encoders/encode-glb';
import {VERSION} from './lib/utils/version';

export type GLBWriterOptions = WriterOptions & {
  glb?: GLBEncodeOptions;
};

/**
 * GLB exporter
 * GLB is the binary container format for GLTF
 */
export const GLBWriter: WriterWithEncoder<GLB, never, GLBWriterOptions> = {
  name: 'GLB',
  id: 'glb',
  module: 'gltf',
  version: VERSION,

  extensions: ['glb'],
  mimeTypes: ['model/gltf-binary'],
  binary: true,
  options: {
    glb: {}
  },

  encode: async (glb, options: GLBWriterOptions = {}) => encodeSync(glb, options),
  encodeSync
};

function encodeSync(glb, options) {
  const {byteOffset = 0} = options;

  // Calculate length and allocate buffer
  const byteLength = encodeGLBSync(glb, null, byteOffset, options);
  const arrayBuffer = new ArrayBuffer(byteLength);

  // Encode into buffer
  const dataView = new DataView(arrayBuffer);
  encodeGLBSync(glb, dataView, byteOffset, options);

  return arrayBuffer;
}
