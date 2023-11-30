// components/SearchBar.spec.js
import { mount, shallowMount } from '@vue/test-utils';
import { test, expect, vi } from 'vitest';
import FindFlight from './FindFlight.vue';
import store from '../store/index.js'
vi.mock('vue-router')


test('Find flight search bars renders correctly', async () => {
    // Mount the component
    const wrapper = mount(FindFlight, {
        global: {
            plugins: [store], // Provide the Vuex store
        },
    });



    // Assert that the component renders without errors
    expect(wrapper).not.toBe(null);

    // Assert that origin and destination select boxes are rendered
    const originSelect = wrapper.findComponent({ ref: 'originSelect' });
    const destinationSelect = wrapper.findComponent({ ref: 'destinationSelect' });

    expect(originSelect.exists()).toBe(true);
    expect(destinationSelect.exists()).toBe(true);

    await originSelect.setValue('Istanbul Airport');
    await destinationSelect.setValue('Antalya Airport');

    // Assert that userCount is initially 1
    const userCountDisplay = wrapper.find('.text-white');
    expect(userCountDisplay.text()).toBe('1');


    const userButton = wrapper.find('.user-button')
    userButton.trigger('click')

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isOpen).toBe(true);


    const increase = wrapper.find('.increase')
    increase.trigger('click')

    await wrapper.vm.$nextTick();

    expect(userCountDisplay.text()).toBe('2');


    const decrease = wrapper.find('.decrease')
    decrease.trigger('click')

    await wrapper.vm.$nextTick();

    expect(userCountDisplay.text()).toBe('1');

    await userButton.trigger('click');


    await wrapper.vm.$nextTick();

    // Assert that the togglePopover method has been called again
    expect(wrapper.vm.isOpen).toBe(false);



    const searchButton = wrapper.find('.search-button')


});
