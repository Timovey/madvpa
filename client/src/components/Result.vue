<template>
    <div class="result">
        <h2 class="title">Ваша норма в неделю:</h2>
        <div class="row">
            <div class="title">Активность в мин.:</div>
            <div class="value">{{ recommend.norm }}</div>
        </div>
        <div class="row" v-if="recommend.stretchCount">
            <div class="title">Кол-во упражнений по растяжке:</div>
            <div class="value">{{ recommend.stretchCount }}</div>
        </div>
        <div class="row" v-if="recommend.powerCount">
            <div class="title">Кол-во силовых упражнений:</div>
            <div class="value">{{ recommend.powerCount }}</div>
        </div>
        <div class="row" v-if="recommend.cardioCount">
            <div class="title">Кол-во кардио упражнений:</div>
            <div class="value">{{ recommend.cardioCount }}</div>
        </div>
        <div class="row" v-if="recommend.comboCount">
            <div class="title">Кол-во комбинированных упражнений:</div>
            <div class="value">{{ recommend.comboCount }}</div>
        </div>
        <div class="bottom">
            <div class="title">Что нужно знать?</div>
            <ul class="body">
                <li>
                    Данные нормативы являются всего лишь рекомендательными под вашу
                    кофигурацию тела, для уточнения списка тренировок проконсультируйтесь
                    со специалистом.
                </li>
                <li>
                    При ухудшении самочувствия во время тренировки необходимо постепенно
                    снизить ритм и замедлиться, крайне не рекомендуется резко закончивать
                    упражнение, только в эксренных случаях
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    recommend: {
        type: Object,
        required: true
    }
});
</script>

<style lang="scss" scoped>
.result {
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-size: 16px;
    max-width: 50%;
    h2.title {
        color: #d6d6d6;
        font-weight: 700;
    }
    .row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 10px;
        .value {
            font-weight: 700;
            color: #f2b030;
        }
    }
    .bottom {
        .title {
            color: #d6d6d6;
            font-weight: 700;
        }
        .body {
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            li:before {
                content: '-';
            }
        }
    }
}
</style>
