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
                    <p>
                        Projekt ma na celu stworzenie urządzenia wykonawczego (serwomechanizmu)
                        sterowanego za pomocą REST API. System składa się z trzech głównych
                        komponentów:
                    </p>
                    <ul>
                        <li>Frontend (interfejs użytkownika)</li>
                        <li>Backend (LabVIEW REST API)</li>
                        <li>Urządzenie wykonawcze (ESP32 + serwomechanizm)</li>
                    </ul>
                </section>

                <section class="about-section">
                    <h2>Specyfikacja Techniczna</h2>
                    <div class="spec-group">
                        <h3>Backend (LabVIEW)</h3>
                        <ul>
                            <li>
                                <strong>Endpoint /actuator (POST)</strong>
                                <p>
                                    Przyjmuje żądania z parametrami sterującymi w formacie JSON:
                                    <code>{ mode: "manual"|"auto", position: 0-180 }</code>
                                </p>
                            </li>
                            <li>
                                <strong>Endpoint /status (GET)</strong>
                                <p>
                                    Zwraca aktualny stan urządzenia w formacie JSON:
                                    <code>{ mode: "manual"|"auto", current_position: 0-180 }</code>
                                </p>
                            </li>
                        </ul>
                    </div>

                    <div class="spec-group">
                        <h3>Frontend (Vue.js)</h3>
                        <ul>
                            <li>Interfejs sterowania z suwakiem i polem numerycznym (0-180°)</li>
                            <li>Przełącznik trybów pracy (manual/auto)</li>
                            <li>Wskaźnik aktualnej pozycji</li>
                            <li>Wizualizacja stanu połączenia z LabVIEW i ESP32</li>
                            <li>System logowania zdarzeń</li>
                        </ul>
                    </div>

                    <div class="spec-group">
                        <h3>Urządzenie Wykonawcze</h3>
                        <ul>
                            <li>Mikrokontroler ESP32</li>
                            <li>Serwomechanizm z zakresem ruchu 0-180°</li>
                            <li>Komunikacja przez WebSocket</li>
                        </ul>
                    </div>
                </section>

                <section class="about-section">
                    <h2>Autorzy:</h2>
                    <ul>
                        <li>Jan Kostka</li>
                        <li>Dmytro Levytskyi</li>
                        <li>Ihor Nytka</li>
                    </ul>

                    <p>Projekt realizowany w ramach zajęć z Oprogramowania Systemów Pomiarowych.</p>
                </section>
            </div>
        </PageContent>
    </div>
</template>

<style scoped>
#about-content {
    width: 100%;
    padding: 2rem;
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
