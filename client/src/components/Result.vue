<template>
    <div class="result">
        <h3 class="descr">
            Данная система предназначения для фитнес пользователей, рекомендации будут
            полезны для начинающих или более оптыных людей, занимающихся фитнесом
        </h3>
        <h2 class="title">Ваша норма в неделю:</h2>
        <div class="row">
            <div class="title nocurp">Активность в мин.:</div>
            <div class="value">{{ recommend.norm }}</div>
        </div>
        <div class="row" v-if="recommend.stretchCount">
            <button @click="select = types.stretchCount" class="title">
                Кол-во упражнений по растяжке:
            </button>
            <div class="value">{{ recommend.stretchCount }}</div>
        </div>
        <div class="row" v-if="recommend.powerCount">
            <button @click="select = types.powerCount" class="title">
                Кол-во силовых упражнений:
            </button>
            <div class="value">{{ recommend.powerCount }}</div>
        </div>
        <div class="row" v-if="recommend.cardioCount">
            <button @click="select = types.cardioCount" class="title">
                Кол-во кардио упражнений:
            </button>
            <div class="value">{{ recommend.cardioCount }}</div>
        </div>
        <div class="row" v-if="recommend.comboCount">
            <button @click="select = types.comboCount" class="title">
                Кол-во комбинированных упражнений:
            </button>
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
                    снизить ритм и замедлиться, крайне не рекомендуется резко заканчивать
                    упражнение, только в экстренных случаях
                </li>
                <li>
                    Любая тренировка состоит из 3 частей: разминка, активная фаза и период
                    остывания,
                </li>
            </ul>
        </div>
    </div>
    <AppModal v-if="select" @close-modal="select = null">
        <div class="wrapper">
            <div class="pulse">
                - При данной физической активности норма пульса составляет
                {{ select.norm ?? '' }}
            </div>
            <div class="recom">
                - При превышении нормы пульса рекомендуется снизить темп или кол-во
                подходов к упражнению
            </div>
            <div class="recom">
                - В данном виде физической активности допускаются такие упражнения, как:
                {{ (select.exercises ?? []).join(', ') }}
            </div>
        </div>
    </AppModal>
</template>

<script setup>
import { ref } from 'vue';
import AppModal from '@/components/AppModal.vue';
const props = defineProps({
    recommend: {
        type: Object,
        required: true
    }
});
const select = ref(null);
const types = {
    stretchCount: {
        norm: '100-120',
        exercises: [
            'вытяжение рук в наклоне',
            'поза треугольника',
            'наклоны к стопам сидя',
            'поза голубя'
        ]
    },
    powerCount: {
        norm: '120-140',
        exercises: ['жим лежа', 'становая тяга', 'подтягивания', 'отжимания']
    },
    cardioCount: {
        norm: '140-160',
        exercises: ['бег трусцой', 'прыжки на скакалке', 'джампинг джек', 'альпинист']
    },
    comboCount: {
        norm: '160-180',
        exercises: ['присед+прыжок', 'отжимания с хлопком', 'комбо из силовой+кардио']
    }
};
</script>

<style lang="scss" scoped>
.result {
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-size: 16px;
    max-width: 50%;
    h2.title {
        color: var(--lk-orange);
        text-decoration: underline;
        font-weight: 700;
    }
    .descr {
        font-weight: 700;
    }
    .row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 10px;
        .title {
            cursor: pointer;
        }
        .title:hover {
            color: var(--lk-orange);
        }
        .title.nocurp {
            cursor: auto;
            color: var(--lk-primary);
        }
        .value {
            font-weight: 700;
            color: var(--lk-orange);
        }
    }
    .bottom {
        .title {
            color: var(--lk-orange);
            text-decoration: underline;
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
.wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
