"use client";

import { useTheme } from "../../context/ThemeContext";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      className={styles.toggleButton}
      onClick={toggleTheme}
      aria-label={`Alternar para modo ${theme === 'light' ? 'escuro' : 'claro'}`}
      title={`Alternar para modo ${theme === 'light' ? 'escuro' : 'claro'}`}
    >
      {theme === 'light' ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.752 15.002C20.5638 15.4975 19.2899 15.7522 18 15.75C14.2712 15.7449 10.7926 13.8556 8.74917 10.7502C6.70577 7.64484 6.34996 3.7384 7.77938 0.326172C5.14356 1.48291 3.05845 3.59044 1.9037 6.22334C0.74894 8.85624 0.604804 11.8455 1.49926 14.5817C2.39371 17.318 4.26232 19.5984 6.75055 20.9634C9.23878 22.3284 12.1476 22.677 14.8833 21.9461C17.6191 21.2151 19.9707 19.4573 21.4888 16.9968C21.6261 16.7788 21.7498 16.5528 21.8595 16.3212C21.8603 16.3196 21.861 16.3181 21.8617 16.3165C21.8234 16.4087 21.785 16.5008 21.7466 16.593C21.7466 16.593 21.7488 16.5886 21.7532 16.5798C21.7575 16.5709 21.764 16.5575 21.7724 16.5407C21.7973 16.4866 21.8232 16.4328 21.8501 16.3793C21.8501 16.3792 21.8501 16.3792 21.8501 16.3792C21.8217 16.4334 21.7929 16.4872 21.7638 16.5408C21.7502 16.5654 21.7069 16.6455 21.7054 16.6493C21.7198 16.6198 21.7338 16.5901 21.7476 16.5602L21.752 16.5516C21.752 16.5516 21.752 16.5516 21.752 16.5516C21.764 16.5284 21.7762 16.5053 21.7886 16.4823C21.7889 16.4818 21.7892 16.4813 21.7895 16.4807C21.7779 16.5011 21.7659 16.5214 21.7537 16.5415C21.7537 16.5415 21.7536 16.5416 21.7536 16.5418C21.7536 16.5419 21.7535 16.542 21.7534 16.5421C21.7534 16.5422 21.7533 16.5423 21.7532 16.5424C21.7532 16.5425 21.7531 16.5426 21.7531 16.5427C21.7456 16.5573 21.6992 16.655 21.6992 16.655C21.7179 16.6191 21.7368 16.5834 21.7556 16.5479C21.7544 16.5503 21.7532 16.5527 21.752 16.5551V16.5552C21.752 16.5552 21.752 16.5552 21.752 16.5553C21.752 16.5554 21.752 16.5555 21.752 16.5556C21.752 16.5556 21.752 16.5557 21.752 16.5558C21.752 16.5558 21.752 16.5559 21.752 16.556C21.752 16.5561 21.752 16.5562 21.752 16.5563C21.752 16.5564 21.752 16.5565 21.752 16.5566C21.752 16.5566 21.752 16.5567 21.752 16.5568C21.752 16.5569 21.752 16.557 21.752 16.5571C21.752 16.5572 21.752 16.5573 21.752 16.5574C21.7467 16.5682 21.7414 16.579 21.736 16.5898L21.752 16.5551V15.002Z" fill="currentColor"/>
          <path d="M12 9C13.6569 9 15 7.65685 15 6C15 4.34315 13.6569 3 12 3C10.3431 3 9 4.34315 9 6C9 7.65685 10.3431 9 12 9Z" fill="currentColor"/>
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" fill="currentColor"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M11 0H13V4.06189C12.6724 4.02104 12.3387 4 12 4C11.6613 4 11.3276 4.02104 11 4.06189V0ZM7.0943 5.68018L4.22173 2.80761L2.80752 4.22183L5.6801 7.09441C6.09071 6.56618 6.56608 6.0908 7.0943 5.68018ZM4.06189 11H0V13H4.06189C4.02104 12.6724 4 12.3387 4 12C4 11.6613 4.02104 11.3276 4.06189 11ZM5.6801 16.9056L2.80751 19.7782L4.22173 21.1924L7.0943 18.3198C6.56608 17.9092 6.09071 17.4338 5.6801 16.9056ZM11 19.9381V24H13V19.9381C12.6724 19.979 12.3387 20 12 20C11.6613 20 11.3276 19.979 11 19.9381ZM16.9056 18.3199L19.7781 21.1924L21.1923 19.7782L18.3198 16.9057C17.9092 17.4339 17.4338 17.9093 16.9056 18.3199ZM19.9381 13H24V11H19.9381C19.979 11.3276 20 11.6613 20 12C20 12.3387 19.979 12.6724 19.9381 13ZM18.3198 7.0943L21.1923 4.22183L19.7781 2.80762L16.9056 5.6801C17.4338 6.09071 17.9092 6.56608 18.3198 7.0943Z" fill="currentColor"/>
        </svg>
      )}
    </button>
  );
}
