<template>
  <div class="reports-container">
    <!-- Header -->
    <div class="reports-header">
      <h1>Rapports et Statistiques</h1>
      <p>Tableau de bord en temps réel des réclamations</p>
      <div class="refresh-info">
        <i class="fas fa-sync-alt" :class="{ spinning: isRefreshing }"></i>
        <span>Dernière mise à jour: {{ lastUpdate }}</span>
        <button @click="refreshData" class="btn-refresh">
          <i class="fas fa-refresh"></i>
          Actualiser
        </button>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="kpi-grid">
      <div class="kpi-card total">
        <div class="kpi-icon">
          <i class="fas fa-clipboard-list"></i>
        </div>
        <div class="kpi-content">
          <h3>{{ kpis.total }}</h3>
          <p>Total réclamations</p>
          <span
            class="kpi-trend"
            :class="kpis.totalTrend >= 0 ? 'positive' : 'negative'"
          >
            <i
              :class="
                kpis.totalTrend >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'
              "
            ></i>
            {{ Math.abs(kpis.totalTrend) }}% ce mois
          </span>
        </div>
      </div>

      <div class="kpi-card urgent">
        <div class="kpi-icon">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <div class="kpi-content">
          <h3>{{ kpis.urgentes }}</h3>
          <p>Urgentes</p>
          <span class="kpi-trend negative">
            <i class="fas fa-exclamation"></i>
            Nécessitent une attention immédiate
          </span>
        </div>
      </div>

      <div class="kpi-card resolution">
        <div class="kpi-icon">
          <i class="fas fa-clock"></i>
        </div>
        <div class="kpi-content">
          <h3>{{ kpis.tempsResolutionMoyen }}</h3>
          <p>Temps moyen de résolution</p>
          <span
            class="kpi-trend"
            :class="kpis.resolutionTrend <= 0 ? 'positive' : 'negative'"
          >
            <i
              :class="
                kpis.resolutionTrend <= 0
                  ? 'fas fa-arrow-down'
                  : 'fas fa-arrow-up'
              "
            ></i>
            {{ Math.abs(kpis.resolutionTrend) }}% vs mois dernier
          </span>
        </div>
      </div>

      <div class="kpi-card satisfaction">
        <div class="kpi-icon">
          <i class="fas fa-star"></i>
        </div>
        <div class="kpi-content">
          <h3>{{ kpis.satisfactionMoyenne }}/5</h3>
          <p>Satisfaction client</p>
          <div class="satisfaction-stars">
            <i
              v-for="n in 5"
              :key="n"
              :class="[
                'fas fa-star',
                { active: n <= Math.round(kpis.satisfactionMoyenne) },
              ]"
            >
            </i>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="charts-row">
      <!-- Status Distribution Chart -->
      <div class="chart-card">
        <div class="chart-header">
          <h3>Répartition par Statut</h3>
          <div class="chart-period">
            <button
              v-for="period in periods"
              :key="period.value"
              @click="selectedPeriod = period.value"
              :class="[
                'period-btn',
                { active: selectedPeriod === period.value },
              ]"
            >
              {{ period.label }}
            </button>
          </div>
        </div>
        <div class="chart-content">
          <div class="donut-chart">
            <svg viewBox="0 0 200 200" class="donut-svg">
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#e5e7eb"
                stroke-width="20"
              />
              <circle
                v-for="(segment, index) in statusChartData"
                :key="index"
                cx="100"
                cy="100"
                r="80"
                fill="none"
                :stroke="segment.color"
                stroke-width="20"
                :stroke-dasharray="`${segment.percentage * 5.024} 502.4`"
                :stroke-dashoffset="segment.offset"
                class="donut-segment"
              />
              <text
                x="100"
                y="100"
                text-anchor="middle"
                dominant-baseline="central"
                class="donut-center"
              >
                {{ kpis.total }}
              </text>
              <text
                x="100"
                y="115"
                text-anchor="middle"
                dominant-baseline="central"
                class="donut-label"
              >
                Total
              </text>
            </svg>
          </div>
          <div class="chart-legend">
            <div
              v-for="item in statusChartData"
              :key="item.label"
              class="legend-item"
            >
              <div
                class="legend-color"
                :style="{ backgroundColor: item.color }"
              ></div>
              <span class="legend-label">{{ item.label }}</span>
              <span class="legend-value"
                >{{ item.value }} ({{ item.percentage }}%)</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Priority Distribution Chart -->
      <div class="chart-card">
        <div class="chart-header">
          <h3>Répartition par Priorité</h3>
        </div>
        <div class="chart-content">
          <div class="bar-chart">
            <div
              v-for="item in priorityChartData"
              :key="item.label"
              class="bar-item"
            >
              <div class="bar-label">{{ item.label }}</div>
              <div class="bar-container">
                <div
                  class="bar-fill"
                  :style="{
                    width: item.percentage + '%',
                    backgroundColor: item.color,
                  }"
                ></div>
                <span class="bar-value">{{ item.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Trends and Performance -->
    <div class="performance-section">
      <div class="performance-card">
        <h3>Tendances des 30 derniers jours</h3>
        <div class="trend-chart">
          <div class="trend-line">
            <div
              v-for="(point, index) in trendData"
              :key="index"
              class="trend-point"
              :style="{
                left: (index / (trendData.length - 1)) * 100 + '%',
                bottom: point.value + '%',
              }"
              :title="`${point.date}: ${point.reclamations} réclamations`"
            ></div>
          </div>
          <div class="trend-labels">
            <span>{{ trendData[0]?.date }}</span>
            <span>{{ trendData[trendData.length - 1]?.date }}</span>
          </div>
        </div>
      </div>

      <div class="performance-card">
        <h3>Performance par Type</h3>
        <div class="type-performance">
          <div
            v-for="type in typePerformance"
            :key="type.label"
            class="type-item"
          >
            <div class="type-header">
              <span class="type-name">{{ type.label }}</span>
              <span class="type-count">{{ type.count }}</span>
            </div>
            <div class="type-metrics">
              <div class="metric">
                <span class="metric-label">Temps moyen</span>
                <span class="metric-value">{{ type.avgTime }}</span>
              </div>
              <div class="metric">
                <span class="metric-label">Taux de résolution</span>
                <span class="metric-value">{{ type.resolutionRate }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="activity-section">
      <div class="activity-header">
        <h3>Activité récente</h3>
        <button @click="loadRecentActivity" class="btn-load-more">
          <i class="fas fa-refresh"></i>
          Actualiser
        </button>
      </div>
      <div class="activity-timeline">
        <div
          v-for="activity in recentActivity"
          :key="activity.id"
          class="activity-item"
        >
          <div class="activity-time">{{ formatTime(activity.timestamp) }}</div>
          <div class="activity-content">
            <div class="activity-icon" :class="activity.type">
              <i :class="getActivityIcon(activity.type)"></i>
            </div>
            <div class="activity-details">
              <p class="activity-text">{{ activity.text }}</p>
              <span class="activity-meta">{{ activity.meta }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Export Section -->
    <div class="export-section">
      <h3>Exportation des données</h3>
      <div class="export-options">
        <button @click="exportData('pdf')" class="export-btn pdf">
          <i class="fas fa-file-pdf"></i>
          Rapport PDF
        </button>
        <button @click="exportData('excel')" class="export-btn excel">
          <i class="fas fa-file-excel"></i>
          Export Excel
        </button>
        <button @click="exportData('csv')" class="export-btn csv">
          <i class="fas fa-file-csv"></i>
          Export CSV
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from "../../services/api.js";

export default {
  name: "AdminReports",
  data() {
    return {
      isRefreshing: false,
      lastUpdate: "",
      selectedPeriod: "month",
      periods: [
        { value: "week", label: "7 jours" },
        { value: "month", label: "30 jours" },
        { value: "quarter", label: "3 mois" },
        { value: "year", label: "1 an" },
      ],
      kpis: {
        total: 0,
        urgentes: 0,
        tempsResolutionMoyen: "0h",
        satisfactionMoyenne: 0,
        totalTrend: 0,
        resolutionTrend: 0,
      },
      statusChartData: [],
      priorityChartData: [],
      trendData: [],
      typePerformance: [],
      recentActivity: [],
    };
  },
  mounted() {
    this.loadReportsData();
    this.updateTime();
    // Auto-refresh every 5 minutes
    setInterval(() => {
      this.loadReportsData();
    }, 5 * 60 * 1000);
  },
  methods: {
    async loadReportsData() {
      this.isRefreshing = true;
      try {
        // Simuler des données de rapport (à remplacer par de vraies API calls)
        await this.loadKPIs();
        await this.loadChartData();
        await this.loadTrendData();
        await this.loadTypePerformance();
        await this.loadRecentActivity();
      } catch (error) {
        console.error("Erreur lors du chargement des rapports:", error);
        this.$toast?.error("Erreur lors du chargement des rapports");
      } finally {
        this.isRefreshing = false;
        this.updateTime();
      }
    },

    async loadKPIs() {
      // Charger les KPIs réels
      const stats = await apiService.getReclamationStats();
      this.kpis = {
        total: stats.total || 0,
        urgentes: stats.urgentes || 0,
        tempsResolutionMoyen: stats.avgResolutionTime || "0h",
        satisfactionMoyenne: stats.avgSatisfaction || 0,
        totalTrend: stats.totalTrend || 0,
        resolutionTrend: stats.resolutionTrend || 0,
      };
    },

    async loadChartData() {
      const stats = await apiService.getReclamationStats();

      // Données pour le graphique des statuts
      this.statusChartData = [
        {
          label: "Ouvertes",
          value: stats.ouvertes || 0,
          color: "#f59e0b",
          percentage: 0,
          offset: 0,
        },
        {
          label: "En cours",
          value: stats.enCours || 0,
          color: "#3b82f6",
          percentage: 0,
          offset: 0,
        },
        {
          label: "Résolues",
          value: stats.resolues || 0,
          color: "#10b981",
          percentage: 0,
          offset: 0,
        },
        {
          label: "Fermées",
          value: stats.fermees || 0,
          color: "#6b7280",
          percentage: 0,
          offset: 0,
        },
      ];

      // Calculer les pourcentages
      const total = this.statusChartData.reduce(
        (sum, item) => sum + item.value,
        0
      );
      let cumulativeOffset = 0;

      this.statusChartData.forEach((item) => {
        item.percentage =
          total > 0 ? Math.round((item.value / total) * 100) : 0;
        item.offset = cumulativeOffset;
        cumulativeOffset += item.percentage * 5.024;
      });

      // Données pour le graphique des priorités
      this.priorityChartData = [
        {
          label: "Urgente",
          value: stats.urgentes || 0,
          color: "#ef4444",
          percentage: 0,
        },
        {
          label: "Haute",
          value: stats.hautes || 0,
          color: "#f59e0b",
          percentage: 0,
        },
        {
          label: "Normale",
          value: stats.normales || 0,
          color: "#3b82f6",
          percentage: 0,
        },
        {
          label: "Basse",
          value: stats.basses || 0,
          color: "#10b981",
          percentage: 0,
        },
      ];

      const maxPriority = Math.max(
        ...this.priorityChartData.map((item) => item.value)
      );
      this.priorityChartData.forEach((item) => {
        item.percentage =
          maxPriority > 0 ? (item.value / maxPriority) * 100 : 0;
      });
    },

    async loadTrendData() {
      // Simuler des données de tendance (à remplacer par de vraies données)
      this.trendData = Array.from({ length: 30 }, (_, i) => ({
        date: new Date(
          Date.now() - (29 - i) * 24 * 60 * 60 * 1000
        ).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" }),
        reclamations: Math.floor(Math.random() * 20) + 5,
        value: Math.floor(Math.random() * 80) + 10,
      }));
    },

    async loadTypePerformance() {
      this.typePerformance = [
        {
          label: "Service",
          count: 45,
          avgTime: "2.3 jours",
          resolutionRate: 85,
        },
        {
          label: "Document",
          count: 32,
          avgTime: "1.8 jours",
          resolutionRate: 92,
        },
        {
          label: "Formation",
          count: 28,
          avgTime: "3.1 jours",
          resolutionRate: 78,
        },
        {
          label: "Technique",
          count: 23,
          avgTime: "4.2 jours",
          resolutionRate: 73,
        },
        { label: "Autre", count: 19, avgTime: "2.9 jours", resolutionRate: 81 },
      ];
    },

    async loadRecentActivity() {
      this.recentActivity = [
        {
          id: 1,
          type: "creation",
          text: "Nouvelle réclamation créée par Jean Dupont",
          meta: "REC-202412-0001 - Service client",
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
        },
        {
          id: 2,
          type: "resolution",
          text: "Réclamation résolue par Admin",
          meta: "REC-202412-0002 - Document manquant",
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
        },
        {
          id: 3,
          type: "assignment",
          text: "Réclamation assignée à Marie Martin",
          meta: "REC-202412-0003 - Formation annulée",
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
        },
      ];
    },

    async refreshData() {
      await this.loadReportsData();
    },

    updateTime() {
      this.lastUpdate = new Date().toLocaleTimeString("fr-FR");
    },

    formatTime(timestamp) {
      const now = new Date();
      const time = new Date(timestamp);
      const diffMinutes = Math.floor((now - time) / (1000 * 60));

      if (diffMinutes < 1) return "À l'instant";
      if (diffMinutes < 60) return `Il y a ${diffMinutes} min`;
      if (diffMinutes < 1440) return `Il y a ${Math.floor(diffMinutes / 60)} h`;
      return time.toLocaleDateString("fr-FR");
    },

    getActivityIcon(type) {
      const icons = {
        creation: "fas fa-plus-circle",
        resolution: "fas fa-check-circle",
        assignment: "fas fa-user-check",
        status_change: "fas fa-arrow-right",
      };
      return icons[type] || "fas fa-circle";
    },

    async exportData(format) {
      try {
        this.$toast?.success(`Export ${format.toUpperCase()} en cours...`);
        // Ici, implémenter l'export réel
        setTimeout(() => {
          this.$toast?.success(`Export ${format.toUpperCase()} terminé`);
        }, 2000);
      } catch (error) {
        console.error("Erreur lors de l'export:", error);
        this.$toast?.error("Erreur lors de l'export");
      }
    },
  },
};
</script>

<style scoped>
.reports-container {
  padding: 2rem;
  background: #f8fafc;
  min-height: 100vh;
}

.reports-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  position: relative;
}

.reports-header h1 {
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
}

.reports-header p {
  font-size: 1.2rem;
  margin: 0 0 1rem 0;
  opacity: 0.9;
}

.refresh-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
  opacity: 0.8;
}

.refresh-info .fas.spinning {
  animation: spin 1s linear infinite;
}

.btn-refresh {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-refresh:hover {
  background: rgba(255, 255, 255, 0.3);
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.kpi-card {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: transform 0.3s ease;
}

.kpi-card:hover {
  transform: translateY(-2px);
}

.kpi-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: white;
}

.kpi-card.total .kpi-icon {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.kpi-card.urgent .kpi-icon {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
}

.kpi-card.resolution .kpi-icon {
  background: linear-gradient(135deg, #4ecdc4, #44a08d);
}

.kpi-card.satisfaction .kpi-icon {
  background: linear-gradient(135deg, #feca57, #ff9ff3);
}

.kpi-content h3 {
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: #2d3748;
}

.kpi-content p {
  margin: 0 0 0.5rem 0;
  color: #718096;
  font-weight: 500;
}

.kpi-trend {
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.kpi-trend.positive {
  color: #38a169;
}

.kpi-trend.negative {
  color: #e53e3e;
}

.satisfaction-stars {
  display: flex;
  gap: 0.2rem;
}

.satisfaction-stars .fas {
  color: #e2e8f0;
  font-size: 1rem;
}

.satisfaction-stars .fas.active {
  color: #fbbf24;
}

.charts-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.chart-card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.chart-header h3 {
  margin: 0;
  color: #2d3748;
  font-size: 1.3rem;
}

.chart-period {
  display: flex;
  gap: 0.5rem;
}

.period-btn {
  padding: 0.4rem 0.8rem;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.period-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.chart-content {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.donut-chart {
  width: 200px;
  height: 200px;
}

.donut-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.donut-segment {
  transition: all 0.3s ease;
}

.donut-center {
  font-size: 1.8rem;
  font-weight: 700;
  fill: #2d3748;
  transform: rotate(90deg);
}

.donut-label {
  font-size: 0.9rem;
  fill: #718096;
  transform: rotate(90deg);
}

.chart-legend {
  flex: 1;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

.legend-label {
  flex: 1;
  font-weight: 500;
  color: #2d3748;
}

.legend-value {
  font-weight: 600;
  color: #4a5568;
}

.bar-chart {
  width: 100%;
}

.bar-item {
  margin-bottom: 1rem;
}

.bar-label {
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.5rem;
}

.bar-container {
  position: relative;
  height: 30px;
  background: #f7fafc;
  border-radius: 15px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 15px;
  position: relative;
  transition: width 0.8s ease;
}

.bar-value {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-weight: 600;
  color: #2d3748;
  font-size: 0.9rem;
}

.performance-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.performance-card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.performance-card h3 {
  margin: 0 0 1.5rem 0;
  color: #2d3748;
}

.trend-chart {
  height: 200px;
  position: relative;
  background: #f8fafc;
  border-radius: 10px;
  padding: 1rem;
}

.trend-line {
  position: relative;
  height: 100%;
  border-bottom: 2px solid #e2e8f0;
}

.trend-point {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #667eea;
  border-radius: 50%;
  transform: translate(-50%, 50%);
}

.trend-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #718096;
}

.type-performance {
  space-y: 1rem;
}

.type-item {
  padding: 1rem;
  background: #f8fafc;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.type-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.type-name {
  font-weight: 600;
  color: #2d3748;
}

.type-count {
  background: #667eea;
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.type-metrics {
  display: flex;
  gap: 2rem;
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.metric-label {
  font-size: 0.8rem;
  color: #718096;
}

.metric-value {
  font-weight: 600;
  color: #2d3748;
}

.activity-section {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.activity-header h3 {
  margin: 0;
  color: #2d3748;
}

.btn-load-more {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-load-more:hover {
  background: #edf2f7;
}

.activity-timeline {
  max-height: 400px;
  overflow-y: auto;
}

.activity-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f1f5f9;
}

.activity-time {
  font-size: 0.8rem;
  color: #718096;
  min-width: 80px;
}

.activity-content {
  display: flex;
  gap: 1rem;
  flex: 1;
}

.activity-icon {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.9rem;
}

.activity-icon.creation {
  background: #48bb78;
}

.activity-icon.resolution {
  background: #4299e1;
}

.activity-icon.assignment {
  background: #ed8936;
}

.activity-details {
  flex: 1;
}

.activity-text {
  margin: 0 0 0.3rem 0;
  font-weight: 500;
  color: #2d3748;
}

.activity-meta {
  font-size: 0.8rem;
  color: #718096;
}

.export-section {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.export-section h3 {
  margin: 0 0 1rem 0;
  color: #2d3748;
}

.export-options {
  display: flex;
  gap: 1rem;
}

.export-btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.export-btn.pdf {
  background: #dc2626;
  color: white;
}

.export-btn.excel {
  background: #059669;
  color: white;
}

.export-btn.csv {
  background: #7c3aed;
  color: white;
}

.export-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .reports-container {
    padding: 1rem;
  }

  .kpi-grid {
    grid-template-columns: 1fr;
  }

  .charts-row {
    grid-template-columns: 1fr;
  }

  .performance-section {
    grid-template-columns: 1fr;
  }

  .chart-content {
    flex-direction: column;
  }

  .export-options {
    flex-direction: column;
  }
}
</style>
