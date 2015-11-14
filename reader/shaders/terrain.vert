uniform sampler2D hMap;

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;


void main(){

    vec4 offset = vec4(0.0,0.0,0.0,0.0);

//you only need to read one because the image is black and white (and grey). 
    texture2D(hMap,aTextureCoord).r;
        offset.y = aTextureCoord*0.25;

    gl_Position = ;

}