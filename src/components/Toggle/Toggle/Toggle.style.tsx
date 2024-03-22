import { Shape } from './Toggle.type';
// Import the 'Shape' type from the adjacent 'Toggle.type' module. This type is likely used to define acceptable shape values for the toggle component.
export const ToggleShapes: Record<Shape, number | string> = {
  // Declare a constant 'ToggleShapes' as a record (an object type that maps keys to values), where keys are of the 'Shape' type and values are either a number or a string. The actual values here could represent different CSS border-radius measurements, which determine the shape of the toggle's visual appearance.
  sharp: 0,
  // The 'sharp' shape is represented by a border-radius of 0, indicating no curvature at the edges, thus creating a sharp-cornered rectangle.
  rounded: 4,
  // The 'rounded' shape has a moderate border-radius of 4, offering slightly rounded corners.
  pillShaped: 24,
  // The 'pillShaped' value has a larger border-radius of 24, which suggests a pill-like, highly rounded shape for the toggle component.
};
