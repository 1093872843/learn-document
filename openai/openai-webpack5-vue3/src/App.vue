<template>
  <div class="container">
    <div class="context">
      <li v-for="(item, index) in message" :key="index">
        {{ item.role }}:{{ item.content }}
      </li>
    </div>
    <input
      v-model="inputValue"
      type="text"
      class="text-input"
      @keydown.enter="inputMessage"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

import axios from 'axios';
const message = ref([
  {
    role: 'system',
    content:
      'You are a  private assistant.your name is 小李,You will remember the conversation and answer ',
  },
]);
const inputValue = ref('');
const apiKey = process.env.OPENAI_API_KEY;

const inputMessage = async () => {
  message.value.push({ role: 'user', content: inputValue.value });
  const params = {
    messages: message.value,
    model: 'gpt-3.5-turbo',
  };
  inputValue.value = null;
  try {
    let response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      params,
      {
        headers: {
          Authorization: 'Bearer ' + apiKey,
        },
        proxy: {
          protocol: 'http',
          host: '127.0.0.1',
          port: 4780,
        },
      },
    );
    console.log(response);
    if (response.status === 200) {
      message.value.push({
        role: response.data.choices[0].message.role,
        content: response.data.choices[0].message.content,
      });
    }
  } catch (e) {
    console.error(e);
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 900px;
  margin: 0px auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  .context {
    width: 100%;
    margin: 40px auto 0px;
  }
}
.text-input {
  width: 900px;
  height: 50px;
  margin: 0px auto;
  position: absolute;
  bottom: 40px;
}
</style>
