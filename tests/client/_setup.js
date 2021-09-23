import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';

// Fix for framer motion update
if (!SVGElement.prototype.getTotalLength) {
  SVGElement.prototype.getTotalLength = () => 1;
}
