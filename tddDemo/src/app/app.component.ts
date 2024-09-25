import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tddDemo';
  public add(numbers: string): number {
    if (!numbers) {
      return 0;
    }

    let delimiters = [',', '\n'];
    let numberString = numbers;

    // Check for custom delimiter
    if (numbers.startsWith('//')) {
      const delimiterSection = numbers.match(/^\/\/(.+)\n/);
      if (delimiterSection) {
        let customDelimiter = delimiterSection[1];
        if (customDelimiter.startsWith('[') && customDelimiter.endsWith(']')) {
          customDelimiter = customDelimiter.slice(1, -1);  // Remove the brackets
          delimiters = customDelimiter.split('][');
        } else {
          delimiters = [customDelimiter];
        }
        numberString = numbers.split('\n')[1];  // Remove the delimiter part
      }
    }

    // Create a regular expression for splitting based on the delimiters
    const delimiterRegex = new RegExp(`[${delimiters.join('')}]`);
    const numberArray = numberString.split(delimiterRegex).map(num => parseInt(num, 10));

    // Check for negative numbers
    const negatives = numberArray.filter(num => num < 0);
    if (negatives.length > 0) {
      console.log(`Negatives not allowed: ${negatives.join(', ')}`);
      throw new Error(`Negatives not allowed: ${negatives.join(', ')}`);
    }

    // Filter out numbers greater than 1000 and return the sum
    return numberArray
      .filter(num => num <= 1000)
      .reduce((sum, num) => sum + (isNaN(num) ? 0 : num), 0);
  }
}
