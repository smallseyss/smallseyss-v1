import styles from '../App.module.css'

function Impressum() {
  return (
    <div className={styles.legalPage}>
      <div className={styles.legalContent}>
        <h1>Impressum</h1>
        
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          <b>Anna-Maria Seyss</b><br />
          unter dem Namen <i>smallseyss.ink</i><br />
          Resident im Silent Sea Studio Berlin<br />
          Pappelallee 69<br />
          Berlin, Germany
        </p>

        <h2>Kontakt</h2>
        <p>
          E-Mail: hey@smallseyss.ink<br />
          Instagram: @smallseyss.ink
        </p>

        <h2>Umsatzsteuer-ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
          **aktuell noch als Kleinunternehmerin gemeldet und somit muss bisher keine Umsatzsteuer erhoben werden**
        </p>


        <h2>Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
            https://ec.europa.eu/consumers/odr/
          </a>
          <br />
          Meine E-Mail-Adresse finden Sie oben im Impressum.
        </p>
      </div>
    </div>
  )
}

export default Impressum 