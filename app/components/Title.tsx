
import styles from '@/app/styling/title.module.css'
export default function Title({ title } : {title : string}) {
    return (
      <div className={styles.content}>
        <h2>{title}</h2>
        <h2>{title}</h2>
      </div>
    )
}
