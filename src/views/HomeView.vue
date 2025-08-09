<script setup lang="ts">
import AppTitle from '@/components/AppTitle.vue';
import NavBar from '@/components/NavBar.vue';
import PageContent from '@/components/PageContent.vue';
import ConnectionStatus from '@/components/connection/ConnectionStatus.vue';
import ServoControl from '@/components/servo/ServoControl.vue';
import ServoChart from '@/components/servo/ServoChart.vue';
import WebSocketManager from '@/components/connection/WebSocketManager.vue';
</script>

<template>
    <div id="page-container">
        <AppTitle />
        <NavBar />
        <PageContent title="Sterowanie serwomechanizmem">
            <div id="home-content">
                <div id="top-panel">
                    <div id="control">
                        <ConnectionStatus />
                        <ServoControl />
                    </div>
                </div>
                <ServoChart />
            </div>
        </PageContent>
        <WebSocketManager />
    </div>
</template>

<style scoped>
#home-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    height: 100%;
    width: 90%;
    gap: 2rem;
}

#top-panel {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    gap: 1rem;
}

#control {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 1rem;
}
</style>
