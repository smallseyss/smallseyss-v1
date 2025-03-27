import styles from '../App.module.css'

function Datenschutz() {
  return (
    <div className={styles.legalPage}>
      <div className={styles.legalContent}>
        <h1>Datenschutzerklärung</h1>

        <h2>1. Datenschutz auf einen Blick</h2>
        <h3>Allgemeine Hinweise</h3>
        <p>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, 
          wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert 
          werden können.
        </p>

        <h3>Datenerfassung auf dieser Website</h3>
        <p>
          <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
          Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
          können Sie dem Impressum dieser Website entnehmen.
        </p>

        <h3>Wie erfassen wir Ihre Daten?</h3>
        <p>
          Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich 
          z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
        </p>

        <h3>Wofür nutzen wir Ihre Daten?</h3>
        <p>
          Die Daten werden erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten und um 
          Ihre Buchungsanfragen bearbeiten zu können.
        </p>

        <h2>2. Hosting</h2>
        <p>
          Wir hosten die Inhalte unserer Website bei [Your Hosting Provider].
        </p>

        <h2>3. Kontaktformular</h2>
        <p>
          Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem 
          Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung 
          der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben 
          wir nicht ohne Ihre Einwilligung weiter.
        </p>

        <h2>4. Ihre Rechte</h2>
        <p>
          Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck 
          Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die 
          Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen.
        </p>
      </div>
    </div>
  )
}

export default Datenschutz 