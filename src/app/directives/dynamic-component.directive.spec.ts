import { DynamicComponentDirective } from './dynamic-component.directive';

describe('DynamicComponentDirective', () => {
  it('should create an instance', () => {
    const viewContainerRef = jasmine.createSpyObj('ViewContainerRef', ['clear', 'createComponent']);
    const directive = new DynamicComponentDirective(viewContainerRef);
    expect(directive).toBeTruthy();
  });
});
