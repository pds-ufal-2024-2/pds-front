import { create } from 'zustand';
import api from '@/services/api';

const useIncidentsStore = create((set) => ({
  incidents: [],
  carregando: false,
  bairroSelecionado: '',
  
  fetchIncidents: async () => {
    set({ carregando: true });
    try {
      const res = await api.get('/incidents');
      set({ incidents: res.data });
    } catch (error) {
      console.error('Erro ao buscar incidents:', error);
    } finally {
      set({ carregando: false });
    }
  },

  updateIncident: (incidentAtualizado) =>
    set((state) => ({
      incidents: state.incidents.map((i) =>
        i.id === incidentAtualizado.id ? incidentAtualizado : i
      ),
    })),

  setBairroSelecionado: (bairro) => set({ bairroSelecionado: bairro }),
}));
export default useIncidentsStore;
