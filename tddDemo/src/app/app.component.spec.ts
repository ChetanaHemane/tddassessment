import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [AppComponent]
  }));
  it('should return 0 for an empty string', () => {
    const app = new AppComponent();
    expect(app.add('')).toBe(0);
  });

  it('should return the number itself for a single number', () => {
    const app = new AppComponent();
    expect(app.add('1')).toBe(1);
  });

  it('should return the sum of two numbers', () => {
    const app = new AppComponent();
    expect(app.add('1,2')).toBe(3);
  });

  it('should handle newlines between numbers', () => {
    const app = new AppComponent();
    expect(app.add('1\n2,3')).toBe(6);
  });

  it('should handle custom delimiter', () => {
    const app = new AppComponent();
    expect(app.add('//[***]\n1***2***3')).toBe(6);
  });

  it('should throw an error for negative numbers', () => {
    const app = new AppComponent();
    expect(() => app.add('1,-2,-3')).toThrow(
      new Error('Negatives not allowed: -2, -3')
    );
  });

  it('should ignore numbers greater than 1000', () => {
    const app = new AppComponent();
    expect(app.add('2,1001')).toBe(2);
  });
});

