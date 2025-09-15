#version 440

varying highp vec2 qt_UV0;
uniform sampler2D DEPTH_TEXTURE;

void main() {
    gl_FragColor = texture2D(DEPTH_TEXTURE, qt_UV0);
}
