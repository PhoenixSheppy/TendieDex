import './style.css';
import { TendieReview } from './types';
import { tendieData } from './data';

class TendieDx {
  private app: HTMLElement;
  private isDarkMode: boolean;

  constructor() {
    this.app = document.getElementById('app')!;
    this.isDarkMode = localStorage.getItem('darkMode') === 'true' || 
                     (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    this.init();
  }

  private init(): void {
    this.setTheme();
    this.render();
  }

  private setTheme(): void {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }

  private toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.setTheme();
  }

  private createStarRating(rating: number): string {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push('<span class="star">★</span>');
      } else {
        stars.push('<span class="star empty">★</span>');
      }
    }
    return `<div class="star-rating">${stars.join('')}</div>`;
  }

  private createPriceBadge(price: string, priceRange: string): string {
    return `<span class="price-badge price-${priceRange}">${price}</span>`;
  }

  private createTendieCard(tendie: TendieReview): string {
    return `
      <div class="tendie-card">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center space-x-3">
            <img src="/images/icons/${tendie.logo}" alt="${tendie.name}" class="w-8 h-8 rounded">
            <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">${tendie.name}</h3>
          </div>
          <div class="flex items-center space-x-2">
            ${this.createPriceBadge(tendie.price, tendie.priceRange)}
            ${this.createStarRating(tendie.rating)}
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span class="font-semibold text-gray-600 dark:text-gray-400">Flavor:</span>
            <span class="ml-2">${tendie.flavor}</span>
          </div>
          <div>
            <span class="font-semibold text-gray-600 dark:text-gray-400">Size:</span>
            <span class="ml-2">${tendie.size}</span>
          </div>
          <div>
            <span class="font-semibold text-gray-600 dark:text-gray-400">Breading:</span>
            <span class="ml-2">${tendie.breading}</span>
          </div>
          <div>
            <span class="font-semibold text-gray-600 dark:text-gray-400">Individuality:</span>
            <span class="ml-2">${tendie.individuality}</span>
          </div>
        </div>
      </div>
    `;
  }

  private createSection(title: string, tendies: TendieReview[]): string {
    const cards = tendies.map(tendie => this.createTendieCard(tendie)).join('');
    
    return `
      <section class="mb-12">
        <h2 class="section-header">${title}</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          ${cards}
        </div>
      </section>
    `;
  }

  private render(): void {
    this.app.innerHTML = `
      <div class="min-h-screen">
        <!-- Header -->
        <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-4xl font-bold text-primary">TendieDex 🐔</h1>
                <p class="text-gray-600 dark:text-gray-400 mt-2">
                  Chicken Tenders, the most basic of foods, yet somehow restaurants manage to screw it up.
                </p>
              </div>
              <button 
                id="theme-toggle" 
                class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle dark mode"
              >
                <span class="text-xl">${this.isDarkMode ? '☀️' : '🌙'}</span>
              </button>
            </div>
          </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <!-- Introduction -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              This is going to be an honest review of chicken tenders and nuggets from a wide variety of places, 
              ranging from classic American diner to seafood restaurant. Everyone has them, and I've probably ordered them. 
              <em>Yeah, I'm that guy that orders from the kids menu...</em>
            </p>
            
            <h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Rules, Standards, and Judgment Guidelines:</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div><strong>Flavor:</strong> Was it good, bad? Rich, garbage?</div>
              <div><strong>Size:</strong> Were they small? Large? Average?</div>
              <div><strong>Breading:</strong> Was it like eating sandpaper? Or was it too wet and fell right off?</div>
              <div><strong>Individuality:</strong> What makes them different compared to everyone else?</div>
            </div>
            
            <div class="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p class="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> These reviews are my own, and solely my own. I have not been influenced by any of the restaurants/brands reviewed.
                All chicken was eaten without sauce or ketchup (as-served). Reviews are sorted <strong>Best to Worst</strong> within each category.
              </p>
            </div>
          </div>

          <!-- Reviews Sections -->
          ${this.createSection('Frozen / Store Bought', tendieData.frozen)}
          ${this.createSection('Fast Food', tendieData.fastFood)}
          ${this.createSection('Restaurants', tendieData.restaurants)}

          <!-- Footer -->
          <footer class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                That's it for now, I'll be updating this if I have any additional restaurants I visit and would like to add.
                <br><strong>(Last Updated 09-14-2025, Begin Site Revamp)</strong>
              </p>
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                Hey there! Just popping in to say THANK YOU for the love I've received on this project over the last year! 
                I've gotten tons of compliments & suggestions! ❤️
              </p>
              
              <h4 class="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">About This Project:</h4>
              <p class="text-gray-600 dark:text-gray-400">
                This project is entirely open-source! And 
                <a href="https://github.com/PhoenixSheppy/TendieDx" class="text-primary hover:underline">available on Github!</a> 
                I'm sure someone will want to do this with french fries or bread or something.
              </p>
            </div>
          </footer>
        </main>
      </div>
    `;

    // Add event listener for theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        this.toggleTheme();
        // Update the button icon
        const icon = themeToggle.querySelector('span');
        if (icon) {
          icon.textContent = this.isDarkMode ? '☀️' : '🌙';
        }
      });
    }
  }
}

// Initialize the app
new TendieDx();