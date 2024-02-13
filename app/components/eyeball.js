import styles from '@/app/styling/eyeball.module.css'
export default function Title({ title }) {
  return (
      <section className={styles.stage}>
        <figure className={styles.ball}>
          <span className={styles.shadow}></span>
          <span className={styles.iris}></span>
        </figure>
      </section>
  )
}
