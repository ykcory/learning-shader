#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define RANGE(a,b,x)(step(a,x)*(1.-step(b,x)))
#define RS(a,b,x)(smoothstep(a-1.,a+1.,x)*(1.-smoothstep(b-1.,b+1.,x)))
#define M_PI 3.1415926535897932384626433832795

#define blue1 vec3(.74,.95,1.)
#define blue2 vec3(.87,.98,1.)
#define blue3 vec3(.35,.76,.83)
#define blue4 vec3(.953,.969,.89)
#define red vec3(1.,.38,.227)

float circle(vec2 uv,vec2 center, float radius, float width){
  float uv_to_center = distance(uv,center);
  // 外边界（0-1）
  float outSide = smoothstep(radius+width/2., radius, uv_to_center);
  // 内边界（0-1）
  float inSide = smoothstep(radius, radius-width/2., uv_to_center);
  return outSide - inSide;
}

float movingLine (vec2 uv, vec2 center, float radius) {
  vec2 pos = uv - center; 
  float angle = atan(pos.y, pos.x);
}

void main(){
  vec2 uv=gl_FragCoord.xy/u_resolution.xy;
  vec2 center=vec2(.5,.5);
  vec3 finalColor = vec3(0.);
  finalColor = mix(finalColor,blue1,circle(uv,center,0.03,0.002));
  finalColor = mix(finalColor,blue1,circle(uv,center,0.15,0.002));
  finalColor = mix(finalColor,blue1,circle(uv,center,0.25,0.002));
  finalColor += circle(uv,center,0.35,0.005);
  
  gl_FragColor=vec4(finalColor,1.);
}