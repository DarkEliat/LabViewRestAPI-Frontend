<script setup lang="ts">
import AppTitle from '@/components/AppTitle.vue';
import NavBar from '@/components/NavBar.vue';
import PageContent from '@/components/PageContent.vue';
</script>

<template>
    <div id="page-container">
        <AppTitle />
        <NavBar />
        <PageContent title="O Projekcie">
            <div id="about-content">
                <section class="about-section">
                    <h2>Cel Projektu</h2>
                    <div class="spec-group">
                        <p>
                            Projekt ma na celu stworzenie urządzenia wykonawczego (serwomechanizmu)
                            sterowanego za pomocą REST API. System składa się z trzech głównych
                            komponentów:
                        </p>
                        <ul>
                            <li><code>Frontend</code> (interfejs użytkownika; klient)</li>
                            <li><code>Backend</code> (LabVIEW REST API)</li>
                            <li><code>Urządzenie wykonawcze</code> (ESP32 + serwomechanizm)</li>
                        </ul>
                    </div>
                </section>

                <section class="about-section">
                    <h2>Frontend (Vue.js)</h2>
                    <div class="spec-group">
                        <ul>
                            <li>
                                Możliwe jest ręcznie ustawiwnie kąta serwa suwakiem lub przez
                                wpisanie liczby, a następnie kliknięcie <code>Ustaw pozycję</code>.
                            </li>
                            <li>Aktualną pozycję widać na bieżąco obok kontrolek.</li>
                            <li>
                                Dostępne są dwa tryby pracy: <code>ręczny</code> i
                                <code>automatyczny</code>. W trybie ręcznym sterowanie odbywa się
                                bezpośrednio.
                            </li>
                            <li>
                                Dwie górne kontrolki wskazują czy aplikacja jest połączona z
                                serwerem i urządzeniem ESP32.
                            </li>
                            <li>
                                Wykres pokazuje ostatnie <code>~30</code> sekund ruchu serwa, co
                                ułatwia śledzenie zmian.
                            </li>
                        </ul>
                        <ul>
                            <li>Zakres pozycji serwa: <code>0–180°</code></li>
                            <li>
                                Adres serwera:
                                <code>http://localhost:9090/ServoControlService</code>
                            </li>
                            <li>Odświeżanie danych: <code>~10 Hz</code></li>
                        </ul>
                    </div>
                </section>

                <section class="about-section">
                    <h2>Backend (LabVIEW)</h2>
                    <div class="spec-group">
                        <ul>
                            <li>
                                Uruchomiony serwer, przyjmuje polecenia (<code
                                    >ustawianie pozycji</code
                                >, <code>zmiana trybu pracy</code>) i zwraca aktualny stan serwa.
                            </li>
                            <li>
                                Serwer przekazuje polecenia do urządzenia ESP32 i odbiera od niego
                                bieżącą pozycję.
                            </li>
                            <li>
                                Ustawienia połączenia (<code>adres</code>, <code>port</code>) można
                                łatwo dopasować do lokalnej sieci.
                            </li>
                        </ul>
                        <ul>
                            <li>
                                Adres domyślny:
                                <code>http://localhost:9090/ServoControlService</code>
                            </li>
                            <li>
                                Endpointy: <code>GET /ServoControlService/status</code>,
                                <code>POST /ServoControlService/actuator</code>
                            </li>
                            <li>Timeout: <code>5 s</code></li>
                            <li>
                                JSON:
                                <code
                                    >{ "status": { "mode": "manual" | "auto", "position": 0-180 }
                                    }</code
                                >
                            </li>
                        </ul>
                    </div>
                </section>

                <section class="about-section">
                    <h2>ESP32 (Sterowanie serwomechanizmem)</h2>
                    <div class="spec-group">
                        <ul>
                            <li>
                                ESP32 steruje serwem w zakresie <code>0–180°</code> i płynnie
                                dojeżdża do wskazanej pozycji.
                            </li>
                            <li>
                                Dostepny jest prosty interfejs sieciowy, dzięki któremu aplikacja
                                może odczytać stan i wysłać nowe polecenia.
                            </li>
                            <li>
                                Aktualnie połączenie następuje z <code>lokalną siecią Wi‑Fi</code>,
                                do której połączony jest również <code>Serwer</code> (LabView) i
                                <code>Klient</code> (Vue.js); w przyszłości możliwe aktualizacje
                                przez sieć Internet.
                            </li>
                        </ul>
                        <ul>
                            <li>Adres urządzenia: <code>http://&lt;esp32-ip&gt;</code></li>
                            <li>
                                Endpointy: <code>GET /status</code>, <code>POST /actuator</code>
                            </li>
                            <li>Nagłówek: <code>Content-Type: application/json</code></li>
                            <li>
                                Przykład żądania (ten sam format JSON co dla Backendu powyżej):
                                <code>{ "status": { "mode": "manual", "position": 90 } }</code>
                            </li>
                        </ul>
                    </div>
                </section>

                <section class="about-section">
                    <h2>Autorzy:</h2>
                    <div class="spec-group">
                        <ul>
                            <li>Jan Kostka</li>
                            <li>Dmytro Levytskyi</li>
                            <li>Ihor Nytka</li>
                        </ul>
                    </div>
                    <p>Projekt realizowany w ramach zajęć z Oprogramowania Systemów Pomiarowych.</p>
                </section>
            </div>
        </PageContent>
    </div>
</template>

<style scoped>
#about-content {
    width: 100%;
    padding: 0 2rem;
    text-align: left;
}

.about-section {
    margin-bottom: 2rem;
}

.about-section h2 {
    color: var(--color-heading);
    font-size: 1.8rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 0.5rem;
}

.about-section h3 {
    color: var(--color-heading);
    font-size: 1.4rem;
    margin: 1.5rem 0 1rem 0;
}

.about-section p {
    margin: 1rem 0;
    line-height: 1.6;
}

.about-section ul {
    list-style-type: none;
    padding-left: 1.5rem;
}

.about-section ul li {
    margin: 0.5rem 0;
    position: relative;
}

.about-section ul li::before {
    content: '•';
    color: var(--color-border);
    font-weight: bold;
    position: absolute;
    left: -1.5rem;
}

.spec-group {
    background-color: var(--color-background-soft);
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin: 1rem 0;
}

code {
    background-color: var(--color-background);
    padding: 0.2rem 0.4rem;
    border-radius: 0.3rem;
    font-family: monospace;
    font-size: 0.9rem;
}

strong {
    color: var(--color-heading);
    font-weight: 600;
}
</style>
