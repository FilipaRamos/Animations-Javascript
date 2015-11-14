uniform sampler2D hMap;
uniform sampler2D colorMap;

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

void main(){

    vec4 offset = vec4(0.0,0.0,0.0,1.0);

//you only need to read one because the image is black and white (and grey). 
   int color =  texture2D(hMap,aTextureCoord).r;
        aVertexPosition.y = color*0.5;

    vTextureCoord = aTextureCoord;
    offset = vec4(aVertexPosition, 1.0);
    gl_Position = gl_ModelViewProjectionMatrix * (gl_Vertex + offset);

}